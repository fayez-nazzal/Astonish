import { ThemeUIStyleObject } from "@theme-ui/core";

export interface AstonishProps {
  children?: JSX.Element[] | JSX.Element;
  infiniteControls?: boolean;
  sx?: ThemeUIStyleObject;
  innerSx?: ThemeUIStyleObject;
  loaderSx?: ThemeUIStyleObject;
  paneSx?: ThemeUIStyleObject;
}

export interface IAstonishLoaderProps {
  numberOfSlides: number;
  sx?: ThemeUIStyleObject;
}

export interface IDropAreaProps {
  position: "left" | "right" | "top" | "bottom";
}

export interface IPaneProps {
  position: "left" | "right" | "top" | "bottom";
  name: string;
  draggable: boolean;
  children: JSX.Element[] | JSX.Element;
  vWidth: string; // width when in horizontal mode
  hHeight: string; // height when in vertical mode
  sx?: ThemeUIStyleObject;
}