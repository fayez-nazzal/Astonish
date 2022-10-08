/** @jsxImportSource @theme-ui/core */
import { motion } from "framer-motion";
import React from "react";
import { getWrongParentErrorMessage } from "../../../utils/errors";
import { ISlideProps } from "./index.types";
import { generateCustomTransition } from "./index.utils";

const Slide = React.memo(
  ({
    children,
    _childOfAstonish,
    transition = generateCustomTransition("tween", 0.32, {
      x: { from: "105%", to: 0 },
    }),
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
          {...transition}
          {...(!_disableInitialTransition ? {} : { initial: false })}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {children}
        </motion.div>
      );

    return <div {...slideProps}>{children}</div>;
  }
);

Slide.displayName = "Slide";

export default Slide;
