export interface IPreviewProps {
  _children?: any;
  _childOfAstonish?: boolean;
  _goToSlide?: (slideIndex: number) => void;
  _currentSlide?: number;
  defaultBackgroundColor?: string;
}

export interface ISlidePreviewProps {
  index: number;
  children: any;
  onClick: () => void;
  active: boolean;
  currentSlide: number;
  defaultBackgroundColor?: string;
}
