/** @jsxImportSource @theme-ui/core */

import React, { useCallback, useEffect, useRef } from "react";
import { IPreviewProps, ISlidePreviewProps } from "./index.types";
import "./index.styles.scss";

const Preview = ({
  _children,
  _goToSlide,
  _currentSlide,
  sx,
  renderSlidePreview,
  initialPosition: position = "left",
}: IPreviewProps) => {
  const _orientation =
    position === "left" || position === "right" ? "vertical" : "horizontal";

  return (
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
            zIndex: 100,
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
        {React.Children.map(_children, (child: JSX.Element, index: number) => {
          return (
            <SlidePreview
              {...child.props}
              onClick={() => _goToSlide(index)}
              active={_currentSlide === index}
              index={index}
              currentSlide={_currentSlide}
              _position={position}
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
                        position === "left" || position === "right"
                          ? "100%"
                          : 140,
                      height:
                        position === "left" || position === "right"
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
