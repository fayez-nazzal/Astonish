import React, { useEffect } from "react";
import { AstonishProps } from "./index.types";
import { getWrongChildrenErrorMessage } from "./index.utils";

import "./index.styles.scss";

const Astonish: React.FC<AstonishProps> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [numberOfSlides, setNumberOfSlides] = React.useState(0);
  const [childrenToRender, setChildrenToRender] = React.useState<
    typeof children
  >([]);

  useEffect(() => {
    const childrenToRender = [];
    let currentLoopedSlideIndex = 0;

    React.Children.forEach(children, (child: JSX.Element) => {
      // get child name
      const childName = child.type.name || child.type;

      if (!["Shared", "Slide"].includes(childName)) {
        throw new Error(getWrongChildrenErrorMessage(childName));
      }

      if (childName !== "Slide" || currentLoopedSlideIndex === currentSlide)
        childrenToRender.push(
          React.cloneElement(child, { _childOfAstonish: true })
        );

      if (childName === "Slide") currentLoopedSlideIndex++;
    });

    setNumberOfSlides(currentLoopedSlideIndex);
    setChildrenToRender(childrenToRender);
  }, [children, currentSlide]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setCurrentSlide((prev) => (prev - 1 < 0 ? 0 : prev - 1));
      e.preventDefault();
    }

    if (e.key === "ArrowRight") {
      setCurrentSlide((prev) => (prev + 1) % numberOfSlides);
      e.preventDefault();
    }
  };

  return (
    <div
      className="astonish"
      data-testid="astonish"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {childrenToRender}
    </div>
  );
};

export default Astonish;
