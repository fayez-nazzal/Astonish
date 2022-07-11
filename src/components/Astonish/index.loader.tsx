import React, { useEffect } from "react";
import { IAstonishLoaderProps } from "./index.types";

const AstonishLoader = ({
  numberOfSlides,
  defaultBackgroundColor,
}: IAstonishLoaderProps) => {
  const [loadingAstonish, setIsLoadingAstonish] = React.useState(true);

  useEffect(() => {
    if (numberOfSlides)
      setTimeout(() => {
        setIsLoadingAstonish(false);
      }, 20 + numberOfSlides * 90);
  }, [numberOfSlides]);

  return loadingAstonish ? (
    <>
      {loadingAstonish && (
        <div
          style={{ backgroundColor: defaultBackgroundColor }}
          className="astonish-loading"
        >
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
