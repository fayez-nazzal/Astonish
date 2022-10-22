import { ThemeUIStyleObject } from "@theme-ui/core";
import { ITransition } from "../Slide/index.types";

export interface AstonishProps {
  children?: JSX.Element[] | JSX.Element;
  infiniteControls?: boolean;
  sx?: ThemeUIStyleObject;
  innerSx?: ThemeUIStyleObject;
  slideSx?: ThemeUIStyleObject;
  paneSx?: ThemeUIStyleObject;
  defaultSlideTransition?: ITransition;
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
  vWidth: string; // width when in vertical mode
  hHeight: string; // height when in horizontal mode
  defaultWidth?: string | string[]; // width when in horizontal mode
  defaultHeight?: string | string[]; // height when in vertical mode
  sx?: ThemeUIStyleObject;
}