/** @jsxImportSource @theme-ui/core */
import React from "react";
import SVGButton from "../../ui/SVGButton";
import Chevron from "./chevron";
import { IArrowControlsProps } from "./index.types";
import { AstonishContext } from "../../contexts/AstonishContext";

import "./index.styles.scss";

const ArrowControls = ({
  iconLeft = <Chevron direction="left" />,
  iconRight = <Chevron direction="right" />,
  sx,
  iconSx,
  isInfinite = false,
}: IArrowControlsProps) => {
  const {
    currentSlide,
    setCurrentSlide,
    setDisableTransition,
    numberOfSlides,
  } = React.useContext(AstonishContext);

  const onPrevious = () => {
    setDisableTransition(true);

    const previousSlide =
      currentSlide - 1 < 0
        ? isInfinite
          ? numberOfSlides - 1
          : 0
        : currentSlide - 1;

    setCurrentSlide(previousSlide);
  };

  const onNext = () => {
    setDisableTransition(false);

    const nextSlide = isInfinite
      ? (currentSlide + 1) % numberOfSlides
      : currentSlide + 1 >= numberOfSlides
      ? numberOfSlides - 1
      : currentSlide + 1;

    setCurrentSlide(nextSlide);
  };

  return (
    <div className="arrow-controls" sx={{ ...sx }}>
      <SVGButton
        ariaLabel="previous slide"
        onClick={onPrevious}
        disabled={!isInfinite && currentSlide === 0}
        icon={iconLeft}
        data-testid="arrow-controls-left"
        className="arrow-controls-left"
        sx={{ ...iconSx }}
      />

      <SVGButton
        ariaLabel="next slide"
        onClick={onNext}
        disabled={!isInfinite && currentSlide === numberOfSlides - 1}
        icon={iconRight}
        data-testid="arrow-controls-right"
        className="arrow-controls-right"
        sx={{ ...iconSx }}
      />
    </div>
  );
};

ArrowControls.displayName = "ArrowControls";

export default ArrowControls;
