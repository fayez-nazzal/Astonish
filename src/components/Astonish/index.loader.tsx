/** @jsxImportSource @theme-ui/core */
import React, { useEffect } from "react";
import { IAstonishLoaderProps } from "./index.types";

const AstonishLoader = ({ numberOfSlides, sx }: IAstonishLoaderProps) => {
  const [loadingAstonish, setIsLoadingAstonish] = React.useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (numberOfSlides)
      timeout = setTimeout(() => {
        setIsLoadingAstonish(false);
      }, numberOfSlides * 300);

    return () => clearTimeout(timeout);
  }, [numberOfSlides]);

  return loadingAstonish ? (
    <>
      {loadingAstonish && (
        <div sx={{ bg: "background", ...sx }} className="astonish-loading">
          Astonish is loading...
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  ) : null;
};

export default AstonishLoader;
