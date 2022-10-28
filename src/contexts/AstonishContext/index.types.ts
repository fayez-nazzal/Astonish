import { UniqueIdentifier } from "@dnd-kit/core";

export interface IAstonishProps {
  slides: JSX.Element[];
  setSlides: (slides: JSX.Element[]) => void;
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  sharedComponents: JSX.Element[];
  setSharedComponents: (sharedComponents: JSX.Element[]) => void;
  controls: JSX.Element[];
  setControls: (controls: JSX.Element[]) => void;
  disableTransition: boolean;
  setDisableTransition: (disableTransition: boolean) => void;
  panePositions: any;
  setPanePositions: (positions: any) => void;
  activeDnDId: UniqueIdentifier;
  setActiveDnDId: (activeDnDId: UniqueIdentifier) => void;
  numberOfSlides: number;
  setNumberOfSlides: (numberOfSlides: number) => void;
}
