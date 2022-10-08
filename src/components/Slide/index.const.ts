import { ITransition } from "./index.types";
import { createTransition } from "./index.utils";

export const SLIDE_DEFAULT_TRANSITION: ITransition = createTransition({
  type: "tween",
  duration: 0.22,
  properties: {
    x: { from: "105%", to: 0 },
  },
});
