import React from "react";
import { IAstonishProps } from "./index.types";

export const AstonishContext = React.createContext<IAstonishProps>({
  slides: [],
  setSlides: () => {},
  currentSlide: 0,
  setCurrentSlide: () => {},
  sharedComponents: [],
  setSharedComponents: () => {},
  controls: [],
  setControls: () => {},
  disableTransition: false,
  setDisableTransition: () => {},
  panePositions: {},
  setPanePositions: () => {},
  activeDnDId: null,
  setActiveDnDId: () => {},
  numberOfSlides: 0,
  setNumberOfSlides: () => {
    ("first");
  },
});

export const AstonishContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [slides, setSlides] = React.useState([]);
  const [sharedComponents, setSharedComponents] = React.useState([]);
  const [controls, setControls] = React.useState([]);
  const [disableTransition, setDisableTransition] = React.useState(false);
  const [panePositions, setPanePositions] = React.useState({});
  const [activeDnDId, setActiveDnDId] = React.useState(null);
  const [numberOfSlides, setNumberOfSlides] = React.useState(0);

  return (
    <AstonishContext.Provider
      value={{
        slides,
        setSlides,
        currentSlide,
        setCurrentSlide,
        sharedComponents,
        setSharedComponents,
        controls,
        setControls,
        disableTransition,
        setDisableTransition,
        panePositions,
        setPanePositions,
        activeDnDId,
        setActiveDnDId,
        numberOfSlides,
        setNumberOfSlides,
      }}
    >
      {children}
    </AstonishContext.Provider>
  );
};
