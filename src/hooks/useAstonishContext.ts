import { useContext } from "react";
import { AstonishContext } from "../contexts/AstonishContext";

export const useAstonish = () => {
  const context = useContext(AstonishContext);

  if (!context) {
    throw new Error("useAstonish must be used within an AstonishProvider");
  }

  return context;
};
