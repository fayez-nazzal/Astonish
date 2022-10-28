/** @jsxImportSource @theme-ui/core */

import React, { useCallback, useEffect, useRef } from "react";
import { IPreviewProps, ISlidePreviewProps } from "./index.types";
import Pane from "../Pane";
import {
  INITIAL_H_PREVIEW_WIDTH,
  INITIAL_V_PREVIEW_HEIGHT,
} from "./index.const";
import "./index.styles.scss";
import { AstonishContext } from "../../contexts/AstonishContext";

const Preview = ({
  name = "Preview",
  defaultPosition = "left",
  sx,
  paneSx,
  draggable = false,
  renderSlidePreview,
}: IPreviewProps) => {
  const { slides, currentSlide, setCurrentSlide, setDisableTransition } =
    React.useContext(AstonishContext);

  const { panePositions } = React.useContext(AstonishContext);

  const _id = "astonish-preview-pane";

  const _currentPosition = panePositions[_id] ?? defaultPosition;

  const _orientation =
    _currentPosition === "left" || _currentPosition === "right"
      ? "vertical"
      : "horizontal";

  const goToSlide = (index: number) => {
    setDisableTransition(true);
    setCurrentSlide(index);
  };

  return (
    <Pane
      draggable={draggable}
      name={name}
      defaultPosition={defaultPosition}
      id={_id}
      key="preview"
      widthHorizontal="100%"
      heightVertical="100%"
      width={INITIAL_H_PREVIEW_WIDTH}
      height={INITIAL_V_PREVIEW_HEIGHT}
      sx={paneSx}
    >
      <div className="preview-wrapper" sx={{ bg: "preview-background" }}>
        <div
          className={`preview ${
            _orientation === "horizontal" ? "horizontal" : "vertical"
          }`}
          sx={{
            boxShadow: "preview-box-shadow",
            borderColor: "primary",
            "&::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
              zIndex: 5,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "primary",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },

            ...sx,
          }}
        >
          {React.Children.map(slides, (child: JSX.Element, index: number) => {
            return (
              <SlidePreview
                {...child.props}
                onClick={() => goToSlide(index)}
                active={currentSlide === index}
                index={index}
                currentSlide={currentSlide}
                _position={_currentPosition}
                _renderSelf={
                  renderSlidePreview ??
                  (({ Wrapper, slide, index, active, onClick, slideSx }) => (
                    <div
                      className={`slide-preview ${
                        active ? "slide-preview-active" : ""
                      }`}
                      onClick={onClick}
                      sx={{
                        position: "relative",
                        width:
                          _currentPosition === "left" ||
                          _currentPosition === "right"
                            ? "100%"
                            : 140,
                        height:
                          _currentPosition === "left" ||
                          _currentPosition === "right"
                            ? 92
                            : "100%",
                        ...slideSx,
                      }}
                    >
                      <Wrapper>{slide}</Wrapper>
                    </div>
                  ))
                }
              />
            );
          })}
        </div>
      </div>
    </Pane>
  );
};

Preview.displayName = "Preview";

export default Preview;

const SlidePreview = ({
  children,
  onClick,
  active,
  index,
  currentSlide,
  _renderSelf,
  _position,
}: ISlidePreviewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [styleProp, setStyleProp] = React.useState<React.CSSProperties>({});

  useEffect(() => {
    const _astonishInner = document.querySelector(".astonish-inner");
    const _slideWrapper = wrapperRef.current;

    if (_astonishInner && _slideWrapper) {
      const _astonishInnerWidth = _astonishInner.clientWidth;
      const _astonishInnerHeight = _astonishInner.clientHeight;
      const _slidePreviewWidth = _slideWrapper.clientWidth;
      const _slidePreviewHeight = _slideWrapper.clientHeight;

      setStyleProp({
        width: _astonishInnerWidth,
        height: _astonishInnerHeight,
        transform: `scale(${_slidePreviewWidth / _astonishInnerWidth}, ${
          _slidePreviewHeight / _astonishInnerHeight
        })`,
      });
    }
  }, []);

  useEffect(() => {
    if (currentSlide === index && !!ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentSlide]);

  // The slide preview should not be rerendered, only the initial view
  const RenderSelf = useCallback<typeof _renderSelf>(_renderSelf, []);

  const Wrapper = useCallback(
    ({ children }: any) => (
      <div
        ref={wrapperRef}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          sx={{
            position: "absolute",
            ...styleProp,
            // origin top left
            transformOrigin: "0 0",
          }}
        >
          {React.cloneElement(children, {
            _disableTransition: true,
            _disableInitialTransition: true,
          })}
        </div>
      </div>
    ),
    [styleProp]
  );

  return (
    <div ref={ref}>
      <RenderSelf
        index={index}
        active={active}
        onClick={onClick}
        Wrapper={Wrapper}
        slide={children}
        position={_position}
      />
    </div>
  );
};
