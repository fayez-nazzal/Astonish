import { render } from "@testing-library/react";
import React from "react";
import Slide from ".";
import Astonish from "../Astonish";
import { getWrongParentErrorMessage } from "./index.utils";

describe("Testing Slide Component", () => {
  it("Throws error when not child of Astonish", () => {
    console.error = () => {};

    expect(() => render(<Slide>test</Slide>)).toThrow(
      getWrongParentErrorMessage()
    );
  });

  it("renders correctly when child of astonish", () => {
    const { queryByText } = render(
      <Astonish>
        <Slide>
          <div>test</div>
        </Slide>
      </Astonish>
    );

    expect(queryByText("test")).toBeInTheDocument();
  });
});
