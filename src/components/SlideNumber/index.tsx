/** @jsxImportSource @theme-ui/core */
import { ISlideNumberProps } from "./index.types";
import React from "react";
import { AstonishContext } from "../../contexts/AstonishContext";

export const SlideNumber = ({
  position = "top-right",
  sx,
}: ISlideNumberProps) => {
  const { currentSlide } = React.useContext(AstonishContext);

  return (
    <div
      sx={{
        position: "absolute",
        zIndex: 15,
        top: position.includes("top") ? 10 : "unset",
        bottom: position.includes("bottom") ? 10 : "unset",
        left:
          (position.includes("left") && 10) ||
          (position.includes("center") && "50%"),
        right: position.includes("right") ? 10 : "unset",
        transform: position.includes("center") && "translateX(-50%)",
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "slide-number",
        color: "background",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 18,
        ...sx,
      }}
    >
      {currentSlide + 1}
    </div>
  );
};

SlideNumber.displayName = "SlideNumber";

export default SlideNumber;
