import {
  fireEvent,
  render,
  queryByText,
  waitFor,
} from "@testing-library/react";
import React from "react";
import ArrowControls from ".";
import Slide from "../Slide";
import Astonish from "../Astonish";

describe("Testing ArrowControls Component", () => {
  it("goes next slide when arrow right is clicked", async () => {
    const { queryByTestId, queryByText } = render(
      <Astonish>
        <ArrowControls />

        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
        <Slide>Slide 3</Slide>
      </Astonish>
    );

    fireEvent.click(queryByTestId("arrow-controls-right"));

    expect(queryByText("Slide 2")).toBeInTheDocument();
  });

  it("goes previous slide when arrow left is clicked", async () => {
    const { queryByTestId, queryByText } = render(
      <Astonish>
        <ArrowControls />

        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
        <Slide>Slide 3</Slide>
      </Astonish>
    );

    fireEvent.click(queryByTestId("arrow-controls-right"));

    expect(queryByText("Slide 2")).toBeInTheDocument();

    fireEvent.click(queryByTestId("arrow-controls-left"));

    expect(queryByText("Slide 1")).toBeInTheDocument();
  });
});
