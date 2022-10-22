import { ITransition } from "./index.types";
import { createTransition } from "./index.utils";

export const DEFAULT_TRANSITION_DURATION = 0.6;

export const DEFAULT_TRANSITION_TYPE = "spring";

export const FadeInTransition = createTransition({
  type: DEFAULT_TRANSITION_TYPE,
  duration: DEFAULT_TRANSITION_DURATION,
  properties: {
    opacity: { from: 0, to: 1 },
  },
});

export const SlideToBottomTransition = createTransition({
  type: DEFAULT_TRANSITION_TYPE,
  duration: DEFAULT_TRANSITION_DURATION,
  properties: {
    y: { from: "-100vh", to: 0 },
  },
});

export const SlideToTopTransition = createTransition({
  type: DEFAULT_TRANSITION_TYPE,
  duration: DEFAULT_TRANSITION_DURATION,
  properties: {
    y: { from: "100vh", to: 0 },
  },
});

export const SlideToRightTransition = createTransition({
  type: DEFAULT_TRANSITION_TYPE,
  duration: DEFAULT_TRANSITION_DURATION,
  properties: {
    x: { from: "-100vw", to: 0 },
  },
});

export const SlideToLeftTransition = createTransition({
  type: DEFAULT_TRANSITION_TYPE,
  duration: DEFAULT_TRANSITION_DURATION,
  properties: {
    x: { from: "100vw", to: 0 },
  },
});

export const SLIDE_DEFAULT_TRANSITION: ITransition = SlideToLeftTransition;
