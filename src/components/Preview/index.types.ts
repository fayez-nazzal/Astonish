import { ThemeUIStyleObject } from "@theme-ui/core";

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

export interface IPreviewProps {
  _children?: any;
  _goToSlide?: (slideIndex: number) => void;
  _currentSlide?: number;
  sx?: ThemeUIStyleObject;
  slideSx?: ThemeUIStyleObject;
  renderSlidePreview?: IRenderSlidePreview;
  initialPosition?: "left" | "right" | "top" | "bottom";
}

export interface ISlidePreviewProps {
  index: number;
  children: any;
  onClick: () => void;
  active: boolean;
  currentSlide: number;
  _renderSelf?: IRenderSlidePreview;
  _position?: "left" | "right" | "top" | "bottom";
}