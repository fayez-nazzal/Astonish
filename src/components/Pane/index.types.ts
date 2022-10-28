import { ThemeUIStyleObject } from "@theme-ui/core";
export enum EPanePossiblePosition {
  left = "left",
  right = "right",
  top = "top",
  bottom = "bottom",
}

export interface IPaneProps {
  id: string;
  name: string;
  width: string;
  height: string;
  draggable?: boolean;
  defaultPosition?: "left" | "right" | "top" | "bottom";
  widthHorizontal?: string | string[];
  heightVertical?: string | string[];
  sx?: ThemeUIStyleObject;
  children: JSX.Element[] | JSX.Element;
}
