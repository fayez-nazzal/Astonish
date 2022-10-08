export interface IPaneContext {
  draggingPaneWidth: number | string;
  setDraggingPaneWidth: (width: number | string) => void;
  draggingPaneHeight: number | string;
  setDraggingPaneHeight: (height: number | string) => void;
}

export interface IPaneContextProviderProps {
  children: JSX.Element;
}
