import { render } from "@testing-library/react";
import React from "react";
import Slide from ".";
import Astonish from "../Astonish";

describe("Testing Slide Component", () => {
  it("renders correctly", () => {
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
