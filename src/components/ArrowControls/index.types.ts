import { ThemeUIStyleObject } from "@theme-ui/core";

export interface IArrowControlsProps {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  _childOfAstonish?: boolean;
  _onNext?: () => void;
  _onPrevious?: () => void;
  _onNextDisabled?: boolean;
  _onPreviousDisabled?: boolean;
  sx?: ThemeUIStyleObject;
  iconSx?: ThemeUIStyleObject;
}

export interface IChevronProps {
  direction: "left" | "right";
}
