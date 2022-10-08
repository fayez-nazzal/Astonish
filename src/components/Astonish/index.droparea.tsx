/** @jsxImportSource @theme-ui/core */

import { useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { IDropAreaProps } from "./index.types";
import React from "react";
import { PaneContext } from "../../contexts/PaneContext";

export const DropArea = ({ position }: IDropAreaProps) => {
  const [mouseSide, setMouseSide] = useState("");
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${position}`,
    disabled: !mouseSide.includes(position),
  });
  const { draggingPaneWidth, draggingPaneHeight } =
    React.useContext(PaneContext);

  useEffect(() => {
    // get mouse position
    const updateMousePosition = (ev) => {
      const mousePosition = { x: ev.clientX, y: ev.clientY };

      if (
        mousePosition.x < window.innerWidth / 2 &&
        mousePosition.y < window.innerHeight / 2
      ) {
        setMouseSide("top left");
      } else if (
        mousePosition.x > window.innerWidth / 2 &&
        mousePosition.y < window.innerHeight / 2
      ) {
        setMouseSide("top right");
      } else if (
        mousePosition.x < window.innerWidth / 2 &&
        mousePosition.y > window.innerHeight / 2
      ) {
        setMouseSide("bottom left");
      } else if (
        mousePosition.x > window.innerWidth / 2 &&
        mousePosition.y > window.innerHeight / 2
      ) {
        setMouseSide("bottom right");
      }
    };

    // set the listener to the same handler function
    document.addEventListener("mousemove", updateMousePosition);

    // remove the event listener when the component is unmounted
    return () => document.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const isOverStyles = {
    bg: "#44444425",
    zIndex: 100,
    [(position === "top" && "borderBottom") ||
    (position === "bottom" && "borderTop") ||
    (position === "left" && "borderRight") ||
    (position === "right" && "borderLeft")]: "2px solid #44444488",
  };

  const dropAreaStyles = {
    top: position === "bottom" ? undefined : 0,
    bottom: position === "top" ? undefined : 0,
    left: position === "right" ? undefined : 0,
    right: position === "left" ? undefined : 0,
    width:
      position === "top" || position === "bottom" ? "100%" : draggingPaneWidth,
    height:
      position === "left" || position === "right" ? "100%" : draggingPaneHeight,
    ...((isOver && isOverStyles) || {}),
  };

  return (
    <div ref={setNodeRef} sx={{ position: "absolute", ...dropAreaStyles }} />
  );
};
