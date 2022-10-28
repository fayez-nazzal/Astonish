/** @jsxImportSource @theme-ui/core */
import { motion } from "framer-motion";
import React from "react";
import { ISlideProps } from "./index.types";

const Slide = ({
  children,
  transition,
  _defaultTransition,
  _disableTransition,
  _disableInitialTransition,
  sx,
}: ISlideProps) => {
  const slideProps = {
    style: { zIndex: 3 },
    sx: { ...sx },
    className: "full-slide",
  };

  if (!_disableTransition)
    return (
      <motion.div
        {...(_defaultTransition ?? transition)}
        {...(!_disableInitialTransition ? {} : { initial: false })}
        {...slideProps}
      >
        {children}
      </motion.div>
    );

  return <div {...slideProps}>{children}</div>;
};

Slide.displayName = "Slide";

export default Slide;
