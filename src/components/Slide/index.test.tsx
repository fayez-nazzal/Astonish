import { render } from "@testing-library/react";
import React from "react";
import Slide from ".";
import { getWrongParentErrorMessage } from "../../utils/errors";
import Astonish from "../Astonish";

describe("Testing Slide Component", () => {
  it("Throws error when not child of Astonish", () => {
    console.error = () => {};

    expect(() => render(<Slide>test</Slide>)).toThrow(
      getWrongParentErrorMessage("Slide", "Astonish")
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
