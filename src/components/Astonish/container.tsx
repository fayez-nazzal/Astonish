import { ThemeProvider } from "@theme-ui/core";

import { theme } from "../../theme";

export const AstonishContainer = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
