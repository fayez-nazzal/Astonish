/** @jsxImportSource @theme-ui/core */

import { useDroppable } from "@dnd-kit/core";
import { IDropAreaProps } from "./index.types";

export const DropArea = ({ position }: IDropAreaProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${position}`,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  const positionStyles = {
    top: position === "bottom" ? undefined : 0,
    bottom: position === "top" ? undefined : 0,
    left: position === "right" ? undefined : 0,
    right: position === "left" ? undefined : 0,
    width: position === "top" || position === "bottom" ? "100%" : 80,
    height: position === "left" || position === "right" ? "100%" : 80,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      sx={{ position: "absolute", ...positionStyles }}
    />
  );
};
