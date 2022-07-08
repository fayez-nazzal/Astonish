import React, { useEffect } from "react";
import { AstonishProps } from "./index.types";
import { getWrongChildrenErrorMessage } from "./index.utils";

import "./index.styles.scss";

const Astonish: React.FC<AstonishProps> = ({ children, infiniteControls }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [numberOfSlides, setNumberOfSlides] = React.useState(0);
  const [childrenToRender, setChildrenToRender] = React.useState<
    typeof children
  >([]);

  const ref = React.useRef<HTMLDivElement>(null);

  // count number of slides
  useEffect(() => {
    let nunberOfSlides = 0;

    React.Children.forEach(children, (child: JSX.Element) => {
      const childName = child.type.name || child.type;

      if (!["Shared", "Slide", "ArrowControls"].includes(childName)) {
        throw new Error(getWrongChildrenErrorMessage(childName));
      }

      if (childName === "Slide") nunberOfSlides++;
    });

    setNumberOfSlides(nunberOfSlides);
  }, [children]);

  // get components to render
  useEffect(() => {
    if (numberOfSlides === 0) return;

    const childrenToRender = [];
    let currentLoopedSlideIndex = 0;

    React.Children.forEach(children, (child: JSX.Element, index) => {
      // get child name
      const childName = child.type.name || child.type;

      if (childName === "ArrowControls")
        childrenToRender.push(
          React.cloneElement(child, {
            _onNext,
            _onPrevious,
            _onNextDisabled:
              !infiniteControls &&
              currentSlide === numberOfSlides &&
              numberOfSlides !== 0,
            _onPreviousDisabled: !infiniteControls && currentSlide === 0,
            key: `astonish-${childName}-${index}`,
            _childOfAstonish: true,
          })
        );
      else if (
        childName !== "Slide" ||
        currentLoopedSlideIndex === currentSlide
      )
        childrenToRender.push(
          React.cloneElement(child, {
            _childOfAstonish: true,
            key: `astonish-${childName}-${index}`,
          })
        );

      if (childName === "Slide") currentLoopedSlideIndex++;
    });

    setChildrenToRender(childrenToRender);

    // autofocus astonish
    ref.current!.focus();
  }, [children, currentSlide, numberOfSlides]);

  const _onPrevious = () => {
    const previousSlide =
      currentSlide - 1 < 0
        ? infiniteControls
          ? numberOfSlides - 1
          : 0
        : currentSlide - 1;

    setCurrentSlide(previousSlide);
  };

  const _onNext = () => {
    const nextSlide = infiniteControls
      ? (currentSlide + 1) % numberOfSlides
      : currentSlide + 1 > numberOfSlides
      ? numberOfSlides - 1
      : currentSlide + 1;

    setCurrentSlide(nextSlide);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      _onPrevious();
      e.preventDefault();
    }

    if (e.key === "ArrowRight") {
      _onNext();
      e.preventDefault();
    }
  };

  return (
    <div
      className="astonish"
      data-testid="astonish"
      tabIndex={0}
      onKeyDown={onKeyDown}
      ref={ref}
    >
      {childrenToRender}
    </div>
  );
};

export default Astonish;
