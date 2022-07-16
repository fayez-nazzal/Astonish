export const getWrongParentErrorMessage = (component: string, parent: string) =>
  `${component} can only be a child of ${parent}.`;
