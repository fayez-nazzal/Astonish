import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ArrowControls from ".";
import Slide from "../Slide";
import Astonish from "../Astonish";
import { getWrongParentErrorMessage } from "./index.utils";

describe("Testing ArrowControls Component", () => {
  it("Throws error when not child of Astonish", () => {
    console.error = () => {};

    expect(() => render(<ArrowControls />)).toThrow(
      getWrongParentErrorMessage()
    );
  });

  it("renders correctly when child of astonish", () => {
    const { queryByTestId } = render(
      <Astonish>
        <ArrowControls />

        <Slide>Slide 1</Slide>
      </Astonish>
    );

    expect(queryByTestId("arrow-controls-left")).toBeInTheDocument();
    expect(queryByTestId("arrow-controls-right")).toBeInTheDocument();
  });

  it("goes next slide when arrow right is clicked", () => {
    const { queryByTestId, queryByText } = render(
      <Astonish>
        <ArrowControls />

        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
        <Slide>Slide 3</Slide>
      </Astonish>
    );

    expect(queryByText("Slide 2")).not.toBeInTheDocument();

    fireEvent.click(queryByTestId("arrow-controls-right"));

    expect(queryByText("Slide 2")).toBeInTheDocument();
  });

  it("goes previous slide when arrow left is clicked", () => {
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
