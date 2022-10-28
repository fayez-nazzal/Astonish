import { Story } from "@storybook/react";
import Astonish from "./index";
import Slide from "../Slide";
import { AstonishProps } from "./index.types";
import FullScreen from "../FullScreen";
import ArrowControls from "../ArrowControls";
import Preview from "../Preview";

import { ReactComponent as ChevronRightIcon } from "../../svg/chevron-custom.svg";
import { ReactComponent as FullScreenIcon } from "../../svg/fullscreen-custom.svg";
import SlideNumber from "../SlideNumber";

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
    <Slide key="1">
      <div style={{ display: "flex" }}>
        <div style={{ width: 400, height: 400, background: "red" }}>
          Slide 1
        </div>
        <div style={{ width: 400, height: 400, background: "blue" }}>
          Slide 1
        </div>
        <div style={{ width: 400, height: 400, background: "green" }}></div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 400, height: 400, background: "yellow" }}>
          Slide 1
        </div>
        <div style={{ width: 400, height: 400, background: "cyan" }}>
          Slide 1
        </div>
        <div style={{ width: 400, height: 400, background: "orange" }}></div>
      </div>
    </Slide>,
    <Slide sx={{ background: "red" }} key="2">
      {" "}
      Slide 2
    </Slide>,
    <Slide sx={{ background: "blue" }} key="3">
      Slide 3
    </Slide>,
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
    <SlideNumber position="top-right" key="18" />,
  ],
};

const CustomizationStory: Story<AstonishProps> = (args) => (
  <Astonish {...args} />
);

export const CustomizedSlideShow = CustomizationStory.bind({});

CustomizedSlideShow.args = {
  children: [
    <Slide key="1">
      <div style={{ display: "flex" }}>
        <div style={{ width: 400, height: 400, background: "red" }}>
          Slide 1
        </div>
        <div style={{ width: 400, height: 400, background: "blue" }}>
          Slide 1
        </div>
        <div style={{ width: 400, height: 400, background: "green" }}></div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 400, height: 400, background: "yellow" }}>
          Slide 1
        </div>
        <div style={{ width: 400, height: 400, background: "cyan" }}>
          Slide 1
        </div>
        <div style={{ width: 400, height: 400, background: "orange" }}></div>
      </div>
    </Slide>,
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
      initialPosition="right"
      sx={{ backgroundColor: "#34352b", color: "white", fontWeight: "bold" }}
      renderSlidePreview={({
        Wrapper,
        slide,
        index,
        active,
        onClick,
        position,
      }) => (
        <div
          sx={{
            margin: "8px 16px !important",
          }}
        >
          <div
            onClick={onClick}
            style={{
              position: "relative",
              height: 92,
              width: ["left", "right"].includes(position) ? "90%" : 140,
              marginBottom: 4,
              marginTop: 4,
              marginLeft: ["left", "right"].includes(position) ? "auto" : 4,
              marginRight: ["left", "right"].includes(position) ? "auto" : 4,
              opacity: active ? 1 : 0.8,
              border: "1px solid",
              borderColor: active ? "#963944" : "#ffffff1A",
              borderRadius: "12px",
              overflow: "hidden",
            }}
            className="slide-preview"
          >
            <Wrapper>{slide}</Wrapper>

            <span
              style={{
                zIndex: 5,
                position: "absolute",
                bottom: 0,
                right: 0,
                background: "#963944",
                padding: "6px 6px 3px 6px",
                borderRadius: "12px 0 12px 0",
              }}
            >
              {index + 1}
            </span>
          </div>
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
