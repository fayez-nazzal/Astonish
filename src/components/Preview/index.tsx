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
  slideSx,
}: IPreviewProps) => {
  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage("Preview", "Astonish"));
  }

  return (
    <div
      className="preview"
      style={{ zIndex: 50 }}
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
            sx={slideSx}
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
  sx,
  currentSlide,
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

  return !snapshot ? (
    <div className="slide-to-snapshot">
      <SnapshotChildren sx={{ ...sx }} setSnapshot={setSnapshot} index={index}>
        {children}
      </SnapshotChildren>
    </div>
  ) : (
    <div
      className={`slide-preview ${active ? "slide-preview-active" : ""}`}
      onClick={onClick}
      ref={ref}
      sx={{ ...sx }}
    >
      <span className="slide-preview-index">{index + 1}</span>
      <div className="slide-preview-slide">
        <img
          src={snapshot}
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
  );
};

const SnapshotChildren = ({
  children,
  setSnapshot,
  index,
  sx,
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
        <div
          className="snapshot-children"
          ref={ref}
          sx={{ bg: "background", ...sx }}
        >
          {children}
        </div>
      )}
    </>
  );
};
