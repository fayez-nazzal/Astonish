import { ISlideTransition, ITransitionProperty } from "./index.types";
export const getWrongParentErrorMessage = () =>
  `Slide can only be a child of Astonish.`;

export const generateCustomTransition = (
  type: "spring" | "tween",
  duration: number,
  properties: Record<string, ITransitionProperty>
) => {
  const finalTransition = {
    initial: {},
    animate: {},
    exit: {},
    transition: {
      duration,
      type,
    },
  };

  Object.keys(properties).forEach((key) => {
    finalTransition.initial[key] = properties[key].from;
    finalTransition.animate[key] = properties[key].to;
    finalTransition.exit[key] = properties[key].to;
  });

  return finalTransition as ISlideTransition;
};
