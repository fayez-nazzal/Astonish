import React from "react";
import { createContext, useState } from "react";
import { IPaneContext, IPaneContextProviderProps } from "./index.types";

export const PaneContext = createContext<IPaneContext>({
  draggingPaneWidth: 0,
  setDraggingPaneWidth: () => {},
  draggingPaneHeight: 0,
  setDraggingPaneHeight: () => {},
});

export const PaneContextProvider = ({
  children,
}: IPaneContextProviderProps) => {
  const [draggingPaneWidth, setDraggingPaneWidth] =
    useState<string | number>(0);
  const [draggingPaneHeight, setDraggingPaneHeight] =
    useState<string | number>(0);

  const handleDraggingPaneWidth = (width: number | string) =>
    setDraggingPaneWidth(width);
  const handleDraggingPaneHeight = (height: number | string) =>
    setDraggingPaneHeight(height);

  return (
    <PaneContext.Provider
      value={{
        draggingPaneWidth,
        setDraggingPaneWidth: handleDraggingPaneWidth,
        draggingPaneHeight,
        setDraggingPaneHeight: handleDraggingPaneHeight,
      }}
    >
      {children}
    </PaneContext.Provider>
  );
};
