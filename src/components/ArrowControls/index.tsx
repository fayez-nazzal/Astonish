import React from "react";
import SVGButton from "../../ui/SVGButton";
import Chevron from "./chevron";
import { IArrowControlsProps } from "./index.types";
import { getWrongParentErrorMessage } from "./index.utils";

import "./index.styles.scss";

const ArrowControls = ({
  iconLeft = <Chevron direction="left" />,
  iconRight = <Chevron direction="right" />,
  _onNext,
  _onNextDisabled,
  _onPrevious,
  _onPreviousDisabled,
  _childOfAstonish,
}: IArrowControlsProps) => {
  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage());
  }

  return (
    <div className="arrow-controls">
      <SVGButton
        ariaLabel="previous slide"
        onClick={_onPrevious}
        disabled={_onPreviousDisabled}
        icon={iconLeft}
        data-testid="arrow-controls-left"
      />

      <SVGButton
        ariaLabel="next slide"
        onClick={_onNext}
        disabled={_onNextDisabled}
        icon={iconRight}
        data-testid="arrow-controls-right"
      />
    </div>
  );
};

export default ArrowControls;
