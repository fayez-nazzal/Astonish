import React from "react";
import { render } from "@testing-library/react";
import Astonish from ".";
import { getWrongChildrenErrorMessage } from "./index.utils";

const SampleComponent = () => {
  return <div>Hello</div>;
};

const Shared = () => {
  return <div>Shared</div>;
};

const Slide = () => {
  return <div>Slide</div>;
};

describe("Test Astonish Component", () => {
  it(`Throws error when providing wrong children`, () => {
    expect(() =>
      render(
        <Astonish>
          <SampleComponent />
          <SampleComponent />
        </Astonish>
      )
    ).toThrow(getWrongChildrenErrorMessage((<SampleComponent />).type.name));
  });

  it("renders correctly when providing correct children", () => {
    const { getByText } = render(
      <Astonish>
        <Shared />
        <Slide />
      </Astonish>
    );

    expect(getByText("Shared")).toBeInTheDocument();
    expect(getByText("Slide")).toBeInTheDocument();
  });
});
