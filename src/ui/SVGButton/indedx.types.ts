import { ThemeUIStyleObject } from "@theme-ui/core";
export interface SVGButtonProps {
  icon: React.ElementType | JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  sx?: ThemeUIStyleObject;
}
