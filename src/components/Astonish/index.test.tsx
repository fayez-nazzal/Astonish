import React from "react";
import {
  render,
  fireEvent,
  screen,
  queryByText,
  waitFor,
} from "@testing-library/react";
import Astonish from ".";
import Slide from "../Slide";

const SampleComponent = () => {
  return <div>Hello</div>;
};

describe("Test Astonish Component", () => {
  it("renders correctly when providing correct children", async () => {
    const { getByText } = render(
      <Astonish>
        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
      </Astonish>
    );

    await waitFor(() => expect(getByText("Slide 1")).toBeInTheDocument());
  });

  it("Goes next slide when pressing ArrowRight", async () => {
    const component = (
      <Astonish>
        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
      </Astonish>
    );

    render(component);

    const { queryByText, getByTestId } = screen;

    await waitFor(() => expect(queryByText("Slide 1")).toBeInTheDocument());

    getByTestId("astonish").focus();

    fireEvent.keyDown(document.activeElement, { key: "ArrowRight" });

    expect(queryByText("Slide 2")).toBeInTheDocument();
  });
});
