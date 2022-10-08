/** @jsxImportSource @theme-ui/core */
import { ISlideNumberProps } from "./index.types";

export const SlideNumber = ({
  position,
  sx,
  _currentSlide,
}: ISlideNumberProps) => {
  return (
    <div
      sx={{
        position: "absolute",
        zIndex: 1000,
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
        background: "primary",
        color: "background",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 18,
        ...sx,
      }}
    >
      {_currentSlide + 1}
    </div>
  );
};

SlideNumber.displayName = "SlideNumber";

export default SlideNumber;
