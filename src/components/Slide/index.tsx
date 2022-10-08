/** @jsxImportSource @theme-ui/core */
import { motion } from "framer-motion";
import React from "react";
import { getWrongParentErrorMessage } from "../../utils/errors";
import { ISlideProps } from "./index.types";

const Slide = React.memo(
  ({
    children,
    _childOfAstonish,
    transition,
    _defaultTransition,
    _disableTransition,
    _disableInitialTransition,
    sx,
  }: ISlideProps) => {
    if (!_childOfAstonish) {
      throw Error(getWrongParentErrorMessage("Slide", "Astonish"));
    }

    const slideProps = {
      style: { zIndex: 60 },
      sx: { ...sx },
      className: "full-slide",
    };

    if (!_disableTransition)
      return (
        <motion.div
          {...(_defaultTransition ?? transition)}
          {...(!_disableInitialTransition ? {} : { initial: false })}
        >
          {children}
        </motion.div>
      );

    return <div {...slideProps}>{children}</div>;
  }
);

Slide.displayName = "Slide";

export default Slide;
