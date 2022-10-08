/** @jsxImportSource @theme-ui/core */

import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ReactComponent as DragHandle } from "../../svg/drag-handle.svg";
import { IPaneProps } from "./index.types";
import { PaneContext } from "../../../contexts/PaneContext";

const Pane = ({
  position = "left",
  name,
  draggable = true,
  vWidth: hWidth,
  hHeight: vHeight,
  children,
  sx,
}: IPaneProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `pane-${name}`,
    disabled: !draggable,
  });

  const { setDraggingPaneWidth, setDraggingPaneHeight } =
    React.useContext(PaneContext);

  const onDragHandleMouseDown = () => {
    setDraggingPaneWidth(hWidth);
    setDraggingPaneHeight(vHeight);
  };

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
        display: "flex",
        flexDirection: _orientation === "horizontal" ? "row" : "column",
        overflow: "hidden",
        ...style,
        width: _orientation === "horizontal" ? "100%" : hWidth,
        height: _orientation === "horizontal" ? vHeight : "100%",
        border: "#555 solid",
        borderLeftWidth: position === "right" ? "1px" : "0",
        borderRightWidth: position === "left" ? "1px" : "0",
        borderTopWidth: position === "bottom" ? "1px" : "0",
        borderBottomWidth: position === "top" ? "1px" : "0",
        ...sx,
      }}
      ref={setNodeRef}
      {...attributes}
      data-testid="pane"
    >
      <div
        sx={{
          display: "flex",
          pl: 2,
          pr: _orientation === "horizontal" ? 2 : 0,
          py: _orientation === "horizontal" ? 2 : 0,
          alignItems: "center",
          justifyContent: "space-between",
          bg: "primary",
          fontSize: "14px",
          lineHeight: "14x",
          color: "#fff",
          flexDirection: _orientation === "horizontal" ? "column" : "row",
          height: _orientation === "horizontal" ? "100%" : 32,
          width: _orientation === "horizontal" ? 66 : "100%",
        }}
        className="drag-handle"
        onMouseDown={onDragHandleMouseDown}
      >
        <label>{name}</label>

        {draggable && (
          <DragHandle
            style={{
              width: 24,
              height: 24,
              cursor: transform ? "grabbing" : "grab",
            }}
            {...listeners}
            data-testid="drag-handle"
          />
        )}
      </div>

      <div
        sx={{
          position: "relative",
          overflow: "hidden",
          "& *": {
            transition: "none !important",
          },
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

Pane.displayName = "Preview";

export default React.memo(Pane);
