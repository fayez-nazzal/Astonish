import { ThemeUIStyleObject } from "@theme-ui/core";
export interface ISlideProps {
  children: any;
  transition?: ISlideTransition;
  _childOfAstonish?: boolean;
  _disableTransition?: boolean;
  _disableInitialTransition?: boolean;
  sx?: ThemeUIStyleObject;
}

export interface ITransitionProperty {
  from: number | string;
  to: number | string;
}

export interface ISlideTransition {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
  exit: Record<string, string | number>;
  transition: {
    duration: number;
    type: "spring" | "tween";
  };
}
