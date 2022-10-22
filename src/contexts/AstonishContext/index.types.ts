import { UniqueIdentifier } from "@dnd-kit/core";

export interface IAstonishProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  slides: JSX.Element[];
  setSlides: (slides: JSX.Element[]) => void;
  sharedComponents: JSX.Element[];
  setSharedComponents: (sharedComponents: JSX.Element[]) => void;
  controls: JSX.Element[];
  setControls: (controls: JSX.Element[]) => void;
  disableTransition: boolean;
  setDisableTransition: (disableTransition: boolean) => void;
  leftPanes: JSX.Element[];
  setLeftPanes: (leftPanes: JSX.Element[]) => void;
  rightPanes: JSX.Element[];
  setRightPanes: (rightPanes: JSX.Element[]) => void;
  topPanes: JSX.Element[];
  setTopPanes: (topPanes: JSX.Element[]) => void;
  bottomPanes: JSX.Element[];
  setBottomPanes: (bottomPanes: JSX.Element[]) => void;
  previewDnDPosition: string | null;
  setPreviewDnDPosition: (previewDnDPosition: string | null) => void;
  activeDnDId: UniqueIdentifier;
  setActiveDnDId: (activeDnDId: UniqueIdentifier) => void;
  numberOfSlides: number;
  setNumberOfSlides: (numberOfSlides: number) => void;
}
