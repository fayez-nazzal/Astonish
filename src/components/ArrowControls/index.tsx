/** @jsxImportSource @theme-ui/core */
import React from "react";
import SVGButton from "../../ui/SVGButton";
import Chevron from "./chevron";
import { IArrowControlsProps } from "./index.types";
import { getWrongParentErrorMessage } from "../../../utils/errors";

import "./index.styles.scss";

const ArrowControls = ({
  iconLeft = <Chevron direction="left" />,
  iconRight = <Chevron direction="right" />,
  _onNext,
  _onNextDisabled,
  _onPrevious,
  _onPreviousDisabled,
  _childOfAstonish,
  sx,
  iconSx,
}: IArrowControlsProps) => {
  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage("ArrowControls", "Astonish"));
  }

  return (
    <div className="arrow-controls" sx={{ ...sx }}>
      <SVGButton
        ariaLabel="previous slide"
        onClick={_onPrevious}
        disabled={_onPreviousDisabled}
        icon={iconLeft}
        data-testid="arrow-controls-left"
        className="arrow-controls-left"
        sx={{ ...iconSx }}
      />

      <SVGButton
        ariaLabel="next slide"
        onClick={_onNext}
        disabled={_onNextDisabled}
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
