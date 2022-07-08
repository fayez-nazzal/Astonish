import React from "react";
import { ISlideProps } from "./index.types";
import { getWrongParentErrorMessage } from "./index.utils";

const Slide = ({ children, _childOfAstonish }: ISlideProps) => {
  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage());
  }

  return children;
};

export default Slide;
