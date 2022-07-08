import { Story } from "@storybook/react";
import React from "react";
import Astonish from "../Astonish";
import Slide from ".";
import { ISlideProps } from "./index.types";

export default {
  title: "Slide",
};

const SlideStory: Story<ISlideProps> = () => (
  <Astonish>
    <Slide>Slide 1</Slide>
    <Slide>Slide 2</Slide>
    <Slide>Slide 3</Slide>
  </Astonish>
);

export const SlideStoryComponent = SlideStory.bind({});
