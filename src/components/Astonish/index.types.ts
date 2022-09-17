import { ThemeUIStyleObject } from "@theme-ui/core";

export interface AstonishProps {
  children?: JSX.Element[] | JSX.Element;
  infiniteControls?: boolean;
  sx?: ThemeUIStyleObject;
  innerSx?: ThemeUIStyleObject;
  loaderSx?: ThemeUIStyleObject;
}

export interface IAstonishLoaderProps {
  numberOfSlides: number;
  sx?: ThemeUIStyleObject;
}

export interface IDropAreaProps {
  position: "left" | "right" | "top" | "bottom";
}