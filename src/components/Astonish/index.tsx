import { ThemeProvider } from "@theme-ui/core";

import { theme } from "../../theme";
import { PaneContextProvider } from "../../contexts/PaneContext/index";
import { AstonishContextProvider } from "../../contexts/AstonishContext";
import AstonishContainer from "./index.astonish-container";
import { AstonishProps } from "./index.types";

const Astonsih = (props: AstonishProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AstonishContextProvider>
        <PaneContextProvider>
          <AstonishContainer {...props} />
        </PaneContextProvider>
      </AstonishContextProvider>
    </ThemeProvider>
  );
};

export default Astonsih;
