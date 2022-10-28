/** @jsxImportSource @theme-ui/core */
import { ISharedProps } from "./index.types";

const Shared = ({ children, sx }: ISharedProps) => {
  return (
    <div sx={{ ...sx }} className="full-slide" style={{ zIndex: 2 }}>
      {children}
    </div>
  );
};

Shared.displayName = "Shared";

export default Shared;
