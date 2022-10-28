import { ThemeUIStyleObject, Theme } from "@theme-ui/core";
import { ITransition } from "../Slide/index.types";

export interface AstonishProps {
  children?: JSX.Element[] | JSX.Element;
  theme?: Theme;
  sx?: ThemeUIStyleObject;
  innerSx?: ThemeUIStyleObject;
  slideSx?: ThemeUIStyleObject;
  paneSx?: ThemeUIStyleObject;
  infiniteControls?: boolean;
  defaultSlideTransition?: ITransition;
}

export interface IAstonishLoaderProps {
  numberOfSlides: number;
  sx?: ThemeUIStyleObject;
}

export interface IDropAreaProps {
  position: "left" | "right" | "top" | "bottom";
}

