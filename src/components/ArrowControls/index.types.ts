import { ThemeUIStyleObject } from "@theme-ui/core";

export interface IArrowControlsProps {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  _onNext?: () => void;
  _onPrevious?: () => void;
  _onNextDisabled?: boolean;
  _onPreviousDisabled?: boolean;
  sx?: ThemeUIStyleObject;
  iconSx?: ThemeUIStyleObject;
  isInfinite?: boolean;
}

export interface IChevronProps {
  direction: "left" | "right";
}
