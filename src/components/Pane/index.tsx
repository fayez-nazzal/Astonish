/** @jsxImportSource @theme-ui/core */

import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { ReactComponent as DragHandle } from "../../svg/drag-handle.svg";
import { IPaneProps } from "./index.types";
import { PaneContext } from "../../contexts/PaneContext";
import { AstonishContext } from "../../contexts/AstonishContext/index";
import { Portal } from "../Portal";

const Pane = ({
  defaultPosition = "left",
  name,
  id,
  width,
  height,
  draggable = false,
  widthHorizontal = "100%",
  heightVertical = "100%",
  children,
  sx,
}: IPaneProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    disabled: !draggable,
  });

  const { setDraggingPaneWidth, setDraggingPaneHeight } =
    React.useContext(PaneContext);

  const { panePositions, setPanePositions } = React.useContext(AstonishContext);

  useEffect(() => {
    setPanePositions({
      [id]: defaultPosition,
    });
  }, []);

  const _currentPosition = panePositions[id] ?? defaultPosition;

  const onDragHandleMouseDown = () => {
    setDraggingPaneWidth(width);
    setDraggingPaneHeight(height);
  };

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const _orientation =
    _currentPosition === "left" || _currentPosition === "right"
      ? "vertical"
      : "horizontal";

  return (
    <Portal
      node={document && document.getElementById(`content-${_currentPosition}`)}
    >
      <div
        sx={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: _orientation === "horizontal" ? "row" : "column",
          overflow: "hidden",
          ...style,
          width: _orientation === "horizontal" ? widthHorizontal : width,
          height: _orientation === "horizontal" ? height : heightVertical,
          border: "#555 solid",
          borderLeftWidth: _currentPosition === "right" ? "1px" : "0",
          borderRightWidth: _currentPosition === "left" ? "1px" : "0",
          borderTopWidth: _currentPosition === "bottom" ? "1px" : "0",
          borderBottomWidth: _currentPosition === "top" ? "1px" : "0",
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
    </Portal>
  );
};

Pane.displayName = "Pane";

export default React.memo(Pane);
