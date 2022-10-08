import { render } from "@testing-library/react";
import React from "react";
import Preview from ".";
import { getWrongParentErrorMessage } from "../../utils/errors";

describe("Testing Preview Component", () => {
  it("Throws error when not child of Astonish", () => {
    console.error = () => {};

    expect(() => render(<Preview />)).toThrow(
      getWrongParentErrorMessage("Preview", "Astonish")
    );
  });
});
