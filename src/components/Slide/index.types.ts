import { ThemeUIStyleObject } from "@theme-ui/core";
export interface ISlideProps {
  children: any;
  transition?: ITransition;
  _disableTransition?: boolean;
  _disableInitialTransition?: boolean;
  _defaultTransition?: ITransition;
  sx?: ThemeUIStyleObject;
}

export interface ITransitionProperty {
  from: number | string;
  to: number | string;
}

export interface ITransition {
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
  exit: Record<string, string | number>;
  transition: {
    duration: number;
    type: "spring" | "tween";
  };
}

export interface ICreateTransitionConfig {
  type: "spring" | "tween";
  duration: number;
  properties: Record<string, ITransitionProperty>;
}