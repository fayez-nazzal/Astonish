import React, { useEffect, useRef } from "react";
import { IPreviewProps, ISlidePreviewProps } from "./index.types";
import { getWrongParentErrorMessage } from "./index.utils";
import { useScreenshot } from "use-react-screenshot";
import "./index.styles.scss";

const Preview = ({
  _children,
  _childOfAstonish,
  _goToSlide,
  _currentSlide,
}: IPreviewProps) => {
  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage());
  }

  return (
    <div className="preview" style={{ zIndex: 50 }}>
      {React.Children.map(_children, (child: JSX.Element, index: number) => {
        return (
          <SlidePreview
            {...child.props}
            onClick={() => _goToSlide(index)}
            active={_currentSlide === index}
            index={index}
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
}: ISlidePreviewProps) => {
  const [snapshot, setSnapshot] = React.useState();

  return !snapshot ? (
    <div className="slide-to-snapshot">
      <SnapshotChildren setSnapshot={setSnapshot}>{children}</SnapshotChildren>
    </div>
  ) : (
    <div
      className={`slide-preview ${active ? "slide-preview-active" : ""}`}
      onClick={onClick}
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
}: {
  children: JSX.Element;
  setSnapshot: (image: any) => void;
}) => {
  const [image, takeScreenShot] = useScreenshot();
  const ref = useRef();

  useEffect(() => {
    // first, hide astonish inner
    const astonishInner = document.querySelector(
      ".astonish-inner"
    ) as HTMLElement;

    astonishInner.style.display = "none";

    setTimeout(() => {
      takeScreenShot(ref.current);
    }, 1000);

    return () => {
      // on unmount, show astonish inner
      astonishInner.style.display = "block";
    };
  }, []);

  useEffect(() => {
    if (image) {
      setSnapshot(image);
    }
  }, [image]);

  return (
    <>
      {image ? null : (
        <div className="snapshot-children" ref={ref}>
          {children}
        </div>
      )}
    </>
  );
};
