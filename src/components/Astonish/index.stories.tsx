import { Story } from "@storybook/react";
import React from "react";
import Astonish from ".";
import Slide from "../Slide";
import { AstonishProps } from "./index.types";
import FullScreen from "../FullScreen";
import ArrowControls from "../ArrowControls";
import Preview from "../Preview";

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
