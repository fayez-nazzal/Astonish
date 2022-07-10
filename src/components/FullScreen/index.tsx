import React, { useEffect, useRef } from "react";
import { getWrongParentErrorMessage } from "../Slide/index.utils";
import { IFullScreenProps } from "./index.types";
import SVGButton from "../../ui/SVGButton";
import FUllScreenIcon from "./fullscreen";
import "./index.styles.scss";
import fscreen from "fscreen";

const FullScreen = ({
  _childOfAstonish,
  _isFullScreen,
  _setIsFullScreen,
  icon = <FUllScreenIcon />,
}: IFullScreenProps) => {
  const timeout = useRef<NodeJS.Timeout>();

  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage());
  }

  // keep synced
  useEffect(() => {
    if (_isFullScreen && !fscreen.fullscreenElement) {
      fscreen.requestFullscreen(document.documentElement);
    } else if (fscreen.fullscreenElement !== null) {
      fscreen.exitFullscreen();
    }
  }, [_isFullScreen]);

  const onFullScreenClick = () => {
    if (fscreen.fullscreenElement === null) {
      try {
        fscreen.requestFullscreen(document.documentElement);
      } catch {}
      _setIsFullScreen(true);
    } else {
      fscreen.exitFullscreen();
      _setIsFullScreen(false);
    }
  };

  return !_isFullScreen ? (
    <SVGButton
      ariaLabel="full screen"
      onClick={onFullScreenClick}
      icon={icon}
      className="full-screen"
    />
  ) : null;
};

FullScreen.displayName = "FullScreen";

export default FullScreen;
