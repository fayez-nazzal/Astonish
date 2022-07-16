import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import Shared from ".";
import Astonish from "../Astonish";
import Slide from "../Slide";
import { getWrongParentErrorMessage } from "../../../utils/errors";

describe("Testing Shared component", () => {
  it("Throws error when not child of Astonish", () => {
    console.error = () => {};

    expect(() => render(<Shared>test</Shared>)).toThrow(
      getWrongParentErrorMessage("Shared", "Astonish")
    );
  });

  it("is rendered", () => {
    const component = (
      <Astonish>
        <Shared>Shared 1</Shared>

        <Slide>Slide 1</Slide>

        <Slide>Slide 2</Slide>
      </Astonish>
    );

    const { queryByText } = render(component);

    expect(queryByText("Shared 1")).toBeInTheDocument();
  });

  it("still the same in when changing current slide", async () => {
    const component = (
      <Astonish>
        <Shared>Shared 1</Shared>

        <Slide>Slide 1</Slide>
        <Slide>Slide 2</Slide>
      </Astonish>
    );

    const { queryByText, getByTestId } = render(component);

    expect(queryByText("Shared 1")).toBeInTheDocument();
    expect(queryByText("Slide 1")).toBeInTheDocument();

    // stimulate space key press
    getByTestId("astonish").focus();
    fireEvent.keyDown(document.activeElement, { key: "Space" });

    await waitFor(() => {
      expect(queryByText("Slide 1")).not.toBeInTheDocument();
    });

    expect(queryByText("Shared 1")).toBeInTheDocument();
  });
});
