import { createPortal } from "react-dom";
import { IPortalProps } from "./index.types";

export const Portal = ({ children, node }: IPortalProps) => {
  return createPortal(children, node);
};
