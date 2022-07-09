import React from "react";
import { IPreviewProps, ISlidePreviewProps } from "./index.types";
import { getWrongParentErrorMessage } from "./index.utils";

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

export default Preview;

const SlidePreview = ({
  children,
  onClick,
  active,
  index,
}: ISlidePreviewProps) => {
  return (
    <div
      className={`slide-preview ${active ? "slide-preview-active" : ""}`}
      onClick={onClick}
    >
      <span className="slide-preview-index">{index + 1}</span>
      <div className="slide-preview-slide">{children}</div>
    </div>
  );
};
