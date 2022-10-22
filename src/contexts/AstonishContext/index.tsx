import React from "react";
import { IAstonishProps } from "./index.types";

export const AstonishContext = React.createContext<IAstonishProps>({
  currentSlide: 0,
  setCurrentSlide: () => {},
  slides: [],
  setSlides: () => {},
  sharedComponents: [],
  setSharedComponents: () => {},
  controls: [],
  setControls: () => {},
  disableTransition: false,
  setDisableTransition: () => {},
  leftPanes: [],
  setLeftPanes: () => {},
  rightPanes: [],
  setRightPanes: () => {},
  topPanes: [],
  setTopPanes: () => {},
  bottomPanes: [],
  setBottomPanes: () => {},
  previewDnDPosition: null,
  setPreviewDnDPosition: () => {},
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
  const [leftPanes, setLeftPanes] = React.useState([]);
  const [rightPanes, setRightPanes] = React.useState([]);
  const [topPanes, setTopPanes] = React.useState([]);
  const [bottomPanes, setBottomPanes] = React.useState([]);
  const [previewDnDPosition, setPreviewDnDPosition] = React.useState(null);
  const [activeDnDId, setActiveDnDId] = React.useState(null);
  const [numberOfSlides, setNumberOfSlides] = React.useState(0);

  return (
    <AstonishContext.Provider
      value={{
        currentSlide,
        setCurrentSlide,
        slides,
        setSlides,
        sharedComponents,
        setSharedComponents,
        controls,
        setControls,
        disableTransition,
        setDisableTransition,
        leftPanes,
        setLeftPanes,
        rightPanes,
        setRightPanes,
        topPanes,
        setTopPanes,
        bottomPanes,
        setBottomPanes,
        previewDnDPosition,
        setPreviewDnDPosition,
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
