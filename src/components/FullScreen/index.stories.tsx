import { Story } from "@storybook/react";
import React from "react";
import FullScreen from ".";
import ArrowControls from "../ArrowControls";
import Astonish from "../Astonish";
import Preview from "../Preview";
import Slide from "../Slide";
import { IFullScreenProps } from "./index.types";

export default {
  title: "FullScreen",
};

export const FullScreenStory: Story<IFullScreenProps> = () => (
  <Astonish>
    <Slide>Slide 1</Slide>
    <Slide>Slide 2</Slide>
    <Slide>Slide 3</Slide>
    <Slide>Slide 4</Slide>
    <Slide>Slide 5</Slide>

    <FullScreen />
  </Astonish>
);

export const FullScreenStoryWithArrowControls: Story<IFullScreenProps> = () => (
  <Astonish>
    <Slide>Slide 1</Slide>
    <Slide>Slide 2</Slide>
    <Slide>Slide 3</Slide>
    <Slide>Slide 4</Slide>
    <Slide>Slide 5</Slide>

    <Preview />
    <ArrowControls />
    <FullScreen />
  </Astonish>
);
