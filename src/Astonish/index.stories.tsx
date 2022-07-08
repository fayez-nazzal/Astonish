import { Story } from "@storybook/react";
import React from "react";
import Astonish from ".";
import { AstonishProps } from "./index.types";

export default {
  title: "Astonish",
};

const AstonishStory: Story<AstonishProps> = (args) => <Astonish {...args} />;

const Shared = () => <div>Shared</div>;
const Slide = () => <div>Slide</div>;

export const AstonhisStoryComponent = AstonishStory.bind({});
AstonhisStoryComponent.args = {
  children: [<Shared key="shared" />, <Slide key="slide" />],
};
