import React, { useEffect } from "react";
import { AstonishProps } from "./index.types";
import { getWrongChildrenErrorMessage } from "./index.utils";

const Astonish: React.FC<AstonishProps> = ({ children }) => {
  const mapChildren = () => {
    return React.Children.map(children, (child: JSX.Element) => {
      // get child name
      const childName = child.type.name || child.type;

      if (!["Shared", "Slide"].includes(childName)) {
        throw new Error(getWrongChildrenErrorMessage(childName));
      }

      return React.cloneElement(child, { _childOfAstonish: true });
    });
  };

  return <>{mapChildren()}</>;
};

export default Astonish;
