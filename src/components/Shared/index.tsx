import React from "react";
import { ISharedProps } from "./index.types";

const Shared = ({ children }: ISharedProps) => {
  return (
    <div className="full-slide" style={{ zIndex: 50 }}>
      {children}
    </div>
  );
};

export default Shared;
