export const getWrongChildrenErrorMessage = (childName: string) =>
  `Astonish only accepts children of type Shared, Slide, ArrowControls, Preview. Received ${childName}`;
