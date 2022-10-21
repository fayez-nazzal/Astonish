import { ThemeUIStyleObject } from "@theme-ui/core";

export interface ISlideNumberProps {
  position:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  sx?: ThemeUIStyleObject;
}
