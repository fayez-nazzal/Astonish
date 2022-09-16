import { ThemeUIStyleObject } from "@theme-ui/core";
export interface IPreviewProps {
  _children?: any;
  _childOfAstonish?: boolean;
  _goToSlide?: (slideIndex: number) => void;
  _currentSlide?: number;
  sx?: ThemeUIStyleObject;
  slideSx?: ThemeUIStyleObject;
}

export interface ISlidePreviewProps {
  index: number;
  children: any;
  onClick: () => void;
  active: boolean;
  currentSlide: number;
  slideSx?: ThemeUIStyleObject;
}

export interface ISnapshotChildrenProps {
  children: JSX.Element;
  setSnapshot: (image: any) => void;
  index: number;
  slideSx: ThemeUIStyleObject;
}
