import { Story } from "@storybook/react";
import React from "react";
import Astonish from ".";
import Shared from "../Shared";
import Slide from "../Slide";
import { AstonishProps } from "./index.types";

export default {
  title: "Astonish",
};

const AstonishStory: Story<AstonishProps> = (args) => <Astonish {...args} />;

export const AstonhisStoryComponent = AstonishStory.bind({});
AstonhisStoryComponent.args = {
  children: [<Slide key="slide">slide content</Slide>],
};
