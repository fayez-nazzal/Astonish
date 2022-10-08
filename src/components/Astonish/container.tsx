import { ThemeProvider } from "@theme-ui/core";

import { theme } from "../../theme";
import { PaneContextProvider } from "../../../contexts/PaneContext/index";

export const AstonishContainer = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <PaneContextProvider>{children}</PaneContextProvider>
    </ThemeProvider>
  );
};
