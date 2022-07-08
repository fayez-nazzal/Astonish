import { Story } from "@storybook/react";
import React from "react";
import Astonish from "../Astonish";
import ArrowControls from ".";
import { IArrowControlsProps } from "./index.types";
import Slide from "../Slide";

export default {
  title: "ArrowControls",
};

const ArrowControlsStory: Story<IArrowControlsProps> = () => (
  <Astonish>
    <ArrowControls />

    <Slide>Slide 1</Slide>
    <Slide>Slide 2</Slide>
    <Slide>Slide 3</Slide>
  </Astonish>
);

export const SlideStoryComponent = ArrowControlsStory.bind({});
