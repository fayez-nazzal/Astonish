import React, { useEffect, useRef } from "react";
import { getWrongParentErrorMessage } from "../Slide/index.utils";
import { IFullScreenProps } from "./index.types";
import SVGButton from "../../ui/SVGButton";
import FUllScreenIcon from "./fullscreen";
import "./index.styles.scss";

const FullScreen = ({
  _childOfAstonish,
  icon = <FUllScreenIcon />,
}: IFullScreenProps) => {
  if (!_childOfAstonish) {
    throw Error(getWrongParentErrorMessage());
  }

  const toggleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        const astonishInner = document.querySelector(
          ".astonish-inner"
        ) as HTMLDivElement;

        // focus on astonish-inner
        astonishInner.focus();

        await astonishInner.requestFullscreen();
      } else if (!!document.fullscreenElement) {
        document.exitFullscreen();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onFullScreenClick = () => {
    toggleFullScreen();
  };

  return (
    <SVGButton
      ariaLabel="full screen"
      onClick={onFullScreenClick}
      icon={icon}
      className="full-screen"
      data-testid="astonish-fullscreen"
    />
  );
};

FullScreen.displayName = "FullScreen";

export default FullScreen;
