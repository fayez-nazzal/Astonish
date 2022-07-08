import { Story } from "@storybook/react";
import React from "react";
import Astonish from "../Astonish";
import Slide from ".";
import { ISlideProps } from "./index.types";

export default {
  title: "Slide",
};

const SlideStory: Story<ISlideProps> = (args) => (
  <Astonish>
    <Slide {...args} />
  </Astonish>
);

export const SlideStoryComponent = SlideStory.bind({});
SlideStoryComponent.args = {
  children: <div>Slide</div>,
};
