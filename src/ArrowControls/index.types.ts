export interface IArrowControlsProps {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  _childOfAstonish?: boolean;
  _onNext?: () => void;
  _onPrevious?: () => void;
  _onNextDisabled?: boolean;
  _onPreviousDisabled?: boolean;
}

export interface IChevronProps {
  direction: "left" | "right";
}
