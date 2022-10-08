import {
  ICreateTransitionConfig,
  ITransition,
  ITransitionProperty,
} from "./index.types";

export const createTransition = ({
  type,
  duration,
  properties,
}: ICreateTransitionConfig) => {
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

  return finalTransition as ITransition;
};
