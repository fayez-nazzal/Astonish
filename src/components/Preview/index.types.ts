import { ThemeUIStyleObject } from "@theme-ui/core";

export interface IPreviewProps {
  name?: string;
  defaultPosition?: "left" | "right" | "top" | "bottom";
  draggable?: boolean;
  renderSlidePreview?: IRenderSlidePreview;
  sx?: ThemeUIStyleObject;
  paneSx?: ThemeUIStyleObject;
}

export interface IRenderSlidePreviewProps {
  index?: number;
  active?: boolean;
  onClick?: any;
  slideSx?: ThemeUIStyleObject;
  position?: "left" | "right" | "top" | "bottom";
  Wrapper: (props: any) => JSX.Element;
  slide: JSX.Element | JSX.Element[];
}

export type IRenderSlidePreview = (
  props: IRenderSlidePreviewProps
) => JSX.Element;

export interface ISlidePreviewProps {
  index: number;
  children: any;
  onClick: () => void;
  active: boolean;
  currentSlide: number;
  _renderSelf?: IRenderSlidePreview;
  _position?: "left" | "right" | "top" | "bottom";
}