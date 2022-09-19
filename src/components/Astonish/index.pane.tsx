/** @jsxImportSource @theme-ui/core */

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { ReactComponent as DragHandle } from "../../svg/drag-handle.svg";
import { IPaneProps } from "./index.types";

const Pane = ({
  position = "left",
  name,
  draggable = true,
  children,
}: IPaneProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `pane-${name}`,
    disabled: !draggable,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const _orientation =
    position === "left" || position === "right" ? "vertical" : "horizontal";

  return (
    <div
      sx={{
        position: "relative",
        zIndex: 100,
        height: "100%",
        display: "flex",
        flexDirection: _orientation === "horizontal" ? "row" : "column",
        ...style,
      }}
      ref={setNodeRef}
      {...attributes}
    >
      <div
        sx={{
          display: "flex",
          height: _orientation === "horizontal" ? "100%" : 32,
          width: _orientation === "horizontal" ? 64 : "100%",
          pl: 2,
          pr: _orientation === "horizontal" ? 2 : 0,
          alignItems: "center",
          justifyContent: "space-between",
          bg: "primary",
          fontSize: "14px",
          lineHeight: "14x",
          color: "#fff",
          flexDirection: _orientation === "horizontal" ? "column" : "row",
        }}
        className="drag-handle"
      >
        <label>{name}</label>

        <DragHandle
          style={{
            width: 24,
            height: 24,
            cursor: transform ? "grabbing" : "grab",
          }}
          {...listeners}
        />
      </div>

      <div
        sx={{
          height: "calc(100% - 32px)",
          position: "relative",
          overflow: "hidden",
          "& *": {
            transition: "none !important",
          },
        }}
      >
        {children}
      </div>
    </div>
  );
};

Pane.displayName = "Preview";

export default React.memo(Pane);
