import React from "react";
import { getWrongParentErrorMessage } from "../../../utils/errors";
import { ISharedProps } from "./index.types";

const Shared = ({ children, _childOfAstonish }: ISharedProps) => {
  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage("Shared", "Astonish"));
  }

  return (
    <div className="full-slide" style={{ zIndex: 50 }}>
      {children}
    </div>
  );
};

Shared.displayName = "Shared";

export default Shared;
