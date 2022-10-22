import React, { useEffect, useRef } from "react";
import { IFullScreenProps } from "./index.types";
import SVGButton from "../../ui/SVGButton";
import FUllScreenIcon from "./fullscreen";
import "./index.styles.scss";

const FullScreen = ({ icon = <FUllScreenIcon />, sx }: IFullScreenProps) => {
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
      sx={{ ...sx }}
    />
  );
};

FullScreen.displayName = "FullScreen";

export default FullScreen;
