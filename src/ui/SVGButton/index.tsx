// accessible SVGButton component

import React from "react";
import { SVGButtonProps } from "./indedx.types";

import "./index.styles.scss";

const SVGButton = ({
  icon,
  onClick,
  disabled,
  className,
  ariaLabel,
  ...rest
}: SVGButtonProps) => {
  const Icon = (
    (icon as JSX.Element).type ? () => icon : icon
  ) as React.ElementType;

  return (
    <button
      className={`c-svg-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      <Icon />
    </button>
  );
};

export default SVGButton;
