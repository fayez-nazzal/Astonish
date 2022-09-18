/** @jsxImportSource @theme-ui/core */

import React, { useEffect, useRef } from "react";
import {
  IPreviewProps,
  ISlidePreviewProps,
  ISnapshotChildrenProps,
} from "./index.types";
import { useScreenshot } from "use-react-screenshot";
import "./index.styles.scss";
import { getWrongParentErrorMessage } from "../../../utils/errors";

const Preview = ({
  _children,
  _childOfAstonish,
  _goToSlide,
  _currentSlide,
  sx,
  renderSlidePreview,
  position = "left",
}: IPreviewProps) => {
  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage("Preview", "Astonish"));
  }

  const _orientation =
    position === "left" || position === "right" ? "vertical" : "horizontal";

  return (
    <div
      className={`preview ${
        _orientation === "horizontal" ? "horizontal" : "vertical"
      }`}
      sx={{
        bg: "preview-background",
        boxShadow: "preview-box-shadow",
        borderColor: "primary",
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
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
            _renderSelf={
              renderSlidePreview ??
              (({ index, imageSrc, active, onClick, slideSx }) => (
                <div
                  className={`slide-preview ${
                    active ? "slide-preview-active" : ""
                  }`}
                  onClick={onClick}
                  sx={slideSx}
                >
                  <span className="slide-preview-index">{index + 1}</span>
                  <div className="slide-preview-slide" sx={slideSx}>
                    <img
                      src={imageSrc}
                      style={{
                        objectFit: "fill",
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  </div>
                </div>
              ))
            }
          />
        );
      })}
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
}: ISlidePreviewProps) => {
  const [snapshot, setSnapshot] = React.useState();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentSlide === index && !!ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  const RenderSelf = _renderSelf;

  return !snapshot ? (
    <div className="slide-to-snapshot">
      <SnapshotChildren setSnapshot={setSnapshot} index={index}>
        {children}
      </SnapshotChildren>
    </div>
  ) : (
    <div ref={ref}>
      <RenderSelf
        index={index}
        imageSrc={snapshot}
        active={active}
        onClick={onClick}
      />
    </div>
  );
};

const SnapshotChildren = ({
  children,
  setSnapshot,
  index,
}: ISnapshotChildrenProps) => {
  const [image, takeScreenShot] = useScreenshot();
  const ref = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      takeScreenShot(ref.current);
    }, 32 * index);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (image) {
      setSnapshot(image);
    }
  }, [image]);

  return (
    <>
      {image ? null : (
        <div className="snapshot-children" ref={ref} sx={{ bg: "background" }}>
          {children}
        </div>
      )}
    </>
  );
};
