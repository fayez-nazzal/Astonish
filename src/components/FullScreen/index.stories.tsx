import { Story } from "@storybook/react";
import React from "react";
import FullScreen from ".";
import Astonish from "../Astonish";
import Slide from "../Slide";
import { IFullScreenProps } from "./index.types";

export default {
  title: "FullScreen",
};

const FullScreenStory: Story<IFullScreenProps> = () => (
  <Astonish>
    <Slide>Slide 1</Slide>
    <Slide>Slide 2</Slide>
    <Slide>Slide 3</Slide>
    <Slide>Slide 4</Slide>
    <Slide>Slide 5</Slide>

    <FullScreen />
  </Astonish>
);

export const AstonhisStoryComponent = FullScreenStory.bind({});
