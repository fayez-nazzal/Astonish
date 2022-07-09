import { Story } from "@storybook/react";
import React from "react";
import Preview from ".";
import Astonish from "../Astonish";
import Slide from "../Slide";
import { IPreviewProps } from "./index.types";

export default {
  title: "Preview",
};

const PreviewStory: Story<IPreviewProps> = () => (
  <Astonish>
    <Slide>Slide 1</Slide>
    <Slide>Slide 2</Slide>
    <Slide>Slide 3</Slide>
    <Slide>Slide 4</Slide>
    <Slide>Slide 5</Slide>
    <Slide>Slide 6</Slide>
    <Slide>Slide 7</Slide>
    <Slide>Slide 8</Slide>
    <Slide>Slide 9</Slide>
    <Slide>Slide 10</Slide>
    <Slide>Slide 11</Slide>
    <Slide>Slide 12</Slide>
    <Slide>Slide 13</Slide>
    <Slide>Slide 14</Slide>
    <Slide>Slide 15</Slide>
    <Slide>Slide 16</Slide>

    <Preview />
  </Astonish>
);

export const AstonhisStoryComponent = PreviewStory.bind({});
