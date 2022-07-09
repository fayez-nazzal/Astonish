import React from "react";
import { ISharedProps } from "./index.types";
import { getWrongParentErrorMessage } from "../Slide/index.utils";

const Shared = ({ children, _childOfAstonish }: ISharedProps) => {
  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage());
  }

  return (
    <div className="full-slide" style={{ zIndex: 50 }}>
      {children}
    </div>
  );
};

Shared.displayName = "Shared";

export default Shared;
