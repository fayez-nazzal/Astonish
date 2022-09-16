import { Story } from "@storybook/react";
import React from "react";
import Astonish from ".";
import Slide from "../Slide";
import { AstonishProps } from "./index.types";
import FullScreen from "../FullScreen";
import ArrowControls from "../ArrowControls";
import Preview from "../Preview";

import { ReactComponent as ChevronRightIcon } from "../../svg/chevron-custom.svg";
import { ReactComponent as FullScreenIcon } from "../../svg/fullscreen-custom.svg";

export default {
  title: "Astonish",
};

const AstonishStory: Story<AstonishProps> = (args) => <Astonish {...args} />;

export const AstonishStoryComponent = AstonishStory.bind({});

AstonishStoryComponent.args = {
  children: [<Slide key="slide">Slide Content</Slide>],
};

export const SlideshowWithPreview = AstonishStory.bind({});

SlideshowWithPreview.args = {
  children: [
    <Slide key="1">Slide 1</Slide>,
    <Slide key="2"> Slide 2</Slide>,
    <Slide key="3">Slide 3</Slide>,
    <Slide key="4">Slide 4</Slide>,
    <Slide key="5">Slide 5</Slide>,
    <Slide key="6">Slide 6</Slide>,
    <Slide key="7">Slide 7</Slide>,
    <Slide key="8">Slide 8</Slide>,
    <Slide key="9">Slide 9</Slide>,
    <Slide key="10">Slide 10</Slide>,
    <Slide key="11">Slide 11</Slide>,
    <Slide key="12">Slide 12</Slide>,
    <Slide key="13">Slide 13</Slide>,
    <Slide key="14">Slide 14</Slide>,
    <Preview key="15" />,
    <ArrowControls key="16" />,
    <FullScreen key="17" />,
  ],
};

const CustomizationStory: Story<AstonishProps> = (args) => (
  <Astonish {...args} />
);

export const CustomizedSlideShow = CustomizationStory.bind({});

CustomizedSlideShow.args = {
  children: [
    <Slide key="1">Slide 1</Slide>,
    <Slide key="2"> Slide 2</Slide>,
    <Slide key="3">Slide 3</Slide>,
    <Slide key="4">Slide 4</Slide>,
    <Slide key="5">Slide 5</Slide>,
    <Slide key="6">Slide 6</Slide>,
    <Slide key="7">Slide 7</Slide>,
    <Slide key="8">Slide 8</Slide>,
    <Slide key="9">Slide 9</Slide>,
    <Slide key="10">Slide 10</Slide>,
    <Slide key="11">Slide 11</Slide>,
    <Slide key="12">Slide 12</Slide>,
    <Slide key="13">Slide 13</Slide>,
    <Slide key="14">Slide 14</Slide>,
    <Preview
      key="15"
      sx={{ backgroundColor: "#34352b", color: "white", fontWeight: "bold" }}
      renderSlidePreview={({ index, imageSrc, active, onClick }) => (
        <div
          onClick={onClick}
          style={{
            position: "relative",
            height: 120,
            margin: 4,
            marginBottom: 10,
            opacity: active ? 1 : 0.8,
          }}
        >
          <img
            src={imageSrc}
            style={{
              objectFit: "fill",
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: 16,
            }}
          />

          <span
            style={{
              zIndex: 100,
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "royalblue",
              padding: "6px 6px 3px 6px",
              borderRadius: "16px 0 16px 0",
            }}
          >
            {index + 1}
          </span>
        </div>
      )}
    />,
    <ArrowControls
      iconRight={
        <ChevronRightIcon style={{ width: 48, height: 48, marginLeft: 8 }} />
      }
      iconLeft={
        <ChevronRightIcon
          style={{ width: 48, height: 48, transform: "rotate(180deg)" }}
        />
      }
      key="16"
    />,
    <FullScreen
      key="17"
      icon={
        <FullScreenIcon style={{ width: 48, height: 48, marginBottom: 16 }} />
      }
    />,
  ],
};
