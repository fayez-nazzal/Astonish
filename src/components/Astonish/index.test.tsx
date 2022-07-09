import React from "react";
import {
  render,
  fireEvent,
  screen,
  queryByText,
  waitFor,
} from "@testing-library/react";
import Astonish from ".";
import { getWrongChildrenErrorMessage } from "./index.utils";
import Slide from "../Slide";

const SampleComponent = () => {
  return <div>Hello</div>;
};

describe("Test Astonish Component", () => {
  it(`Throws error when providing wrong children`, () => {
    console.error = () => {};

    try {
      expect(() =>
        render(
          <Astonish>
            <SampleComponent />
            <SampleComponent />
          </Astonish>
        )
      ).toThrow(getWrongChildrenErrorMessage((<SampleComponent />).type.name));
    } catch {}
  });

  it("renders correctly when providing correct children", () => {
    const { getByText } = render(
      <Astonish>
        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
      </Astonish>
    );

    expect(getByText("Slide 1")).toBeInTheDocument();
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

    expect(queryByText("Slide 1")).toBeInTheDocument();
    expect(queryByText("Slide 2")).not.toBeInTheDocument();

    getByTestId("astonish").focus();

    fireEvent.keyDown(document.activeElement, { key: "ArrowRight" });

    expect(queryByText("Slide 2")).toBeInTheDocument();
    await waitFor(() => expect(queryByText("Slide 1")).not.toBeInTheDocument());
  });
});
