import React, { ReactElement, useEffect } from "react";
import { AstonishProps } from "./index.types";
import { getWrongChildrenErrorMessage } from "./index.utils";

import "./index.styles.scss";
import "../../global.scss";

import { AnimatePresence } from "framer-motion";
import AstonishLoader from "./index.loader";

const Astonish: React.FC<AstonishProps> = ({
  children,
  infiniteControls,
  defaultBackgroundColor = "#22232b",
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [numberOfSlides, setNumberOfSlides] = React.useState(0);
  const [childrenToRender, setChildrenToRender] = React.useState<
    typeof children
  >([]);
  const [previewComponent, setPreviewComponent] =
    React.useState<ReactElement>();
  const [fullScrenComponent, setFullScreenComponent] =
    React.useState<ReactElement>();
  const [disableTransition, setDisableTransition] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  // count number of slides
  useEffect(() => {
    let nunberOfSlides = 0;

    React.Children.forEach(children, (child: JSX.Element) => {
      const childName = child.type.displayName || child.type;

      if (
        !["Shared", "Slide", "ArrowControls", "Preview", "FullScreen"].includes(
          childName
        )
      ) {
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
    const slides = [];

    React.Children.forEach(children, (child: JSX.Element, index) => {
      // get child name
      const childName = child.type.displayName || child.type;

      if (childName === "ArrowControls")
        childrenToRender.push(
          React.cloneElement(child, {
            _onNext,
            _onPrevious,
            _onNextDisabled:
              !infiniteControls && currentSlide === numberOfSlides - 1,
            _onPreviousDisabled: !infiniteControls && currentSlide === 0,
            key: `astonish-${childName}-${index}`,
            _childOfAstonish: true,
          })
        );
      else if (childName === "Preview") {
        setPreviewComponent(
          React.cloneElement(child, {
            _childOfAstonish: true,
            _children: slides,
            _goToSlide,
            _currentSlide: currentSlide,
          })
        );
      } else if (childName === "FullScreen") {
        setFullScreenComponent(
          React.cloneElement(child, {
            _childOfAstonish: true,
          })
        );
      } else if (
        childName !== "Slide" ||
        currentLoopedSlideIndex === currentSlide
      )
        childrenToRender.push(
          <AnimatePresence key={`astonish-${childName}-${index}`}>
            {React.cloneElement(child, {
              _childOfAstonish: true,
              _disableTransition: disableTransition,
              _disableInitialTransition: currentLoopedSlideIndex === 0,
            })}
          </AnimatePresence>
        );

      if (childName === "Slide") {
        currentLoopedSlideIndex++;
        slides.push(child);
      }
    });

    setChildrenToRender(childrenToRender);

    // autofocus astonish
    ref.current!.focus();
  }, [children, currentSlide, numberOfSlides]);

  const _goToSlide = (slideIndex: number) => {
    setDisableTransition(true);
    setCurrentSlide(slideIndex);
  };

  const _onPrevious = () => {
    setDisableTransition(true);

    const previousSlide =
      currentSlide - 1 < 0
        ? infiniteControls
          ? numberOfSlides - 1
          : 0
        : currentSlide - 1;

    setCurrentSlide(previousSlide);
  };

  const _onNext = () => {
    setDisableTransition(false);

    const nextSlide = infiniteControls
      ? (currentSlide + 1) % numberOfSlides
      : currentSlide + 1 >= numberOfSlides
      ? numberOfSlides - 1
      : currentSlide + 1;

    setCurrentSlide(nextSlide);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "PageDown") {
      _onPrevious();
      e.preventDefault();
    }

    if (
      e.key === "ArrowRight" ||
      e.key === " " ||
      e.key === "Enter" ||
      e.key == "Space" ||
      e.key === "PageUp"
    ) {
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
      <AstonishLoader
        numberOfSlides={numberOfSlides}
        defaultBackgroundColor={defaultBackgroundColor}
      />

      {previewComponent}
      <div
        className="astonish-inner"
        style={{ background: defaultBackgroundColor }}
      >
        {childrenToRender}
      </div>

      {fullScrenComponent}
    </div>
  );
};

Astonish.displayName = "Astonish";

export default Astonish;
