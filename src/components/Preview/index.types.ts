import { ThemeUIStyleObject } from "@theme-ui/core";

export interface IRenderSlidePreviewProps {
  index?: number;
  imageSrc: string;
  active?: boolean;
  onClick?: any;
  slideSx?: ThemeUIStyleObject
}

export type IRenderSlidePreview = (props: IRenderSlidePreviewProps) => JSX.Element;

export interface IPreviewProps {
  _children?: any;
  _childOfAstonish?: boolean;
  _goToSlide?: (slideIndex: number) => void;
  _currentSlide?: number;
  sx?: ThemeUIStyleObject;
  slideSx?: ThemeUIStyleObject;
  renderSlidePreview?: IRenderSlidePreview;
}

export interface ISlidePreviewProps {
  index: number;
  children: any;
  onClick: () => void;
  active: boolean;
  currentSlide: number;
  _renderSelf?: IRenderSlidePreview;
}

export interface ISnapshotChildrenProps {
  children: JSX.Element;
  setSnapshot: (image: any) => void;
  index: number;
}
