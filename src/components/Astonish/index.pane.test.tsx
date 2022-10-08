import { render } from "@testing-library/react";
import Pane from "./index.pane";

const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

describe("Testing Pane element", () => {
  const vWidth = "200px";
  const hHeight = "200px";

  it("renders correctly (left)", () => {
    const { getByTestId } = render(
      <Pane
        name="test-pane"
        position="left"
        vWidth={vWidth}
        hHeight={hHeight}
        draggable
      >
        <div>Pane</div>
      </Pane>
    );

    const renderedPane = getByTestId("pane");

    expect(renderedPane).toBeInTheDocument();

    expect(renderedPane).toHaveStyle(`
        width: ${vWidth};
        height: 100%;
    `);
  });

  it("renders correctly (right)", () => {
    const { getByTestId } = render(
      <Pane
        name="test-pane"
        position="right"
        vWidth={vWidth}
        hHeight={hHeight}
        draggable={false}
      >
        <div>Pane</div>
      </Pane>
    );

    const renderedPane = getByTestId("pane");

    expect(renderedPane).toBeInTheDocument();

    expect(renderedPane).toHaveStyle(`
        width: ${vWidth};
        height: 100%;
    `);
  });

  it("renders correctly (top)", () => {
    const { getByTestId } = render(
      <Pane
        name="test-pane"
        position="top"
        vWidth={vWidth}
        hHeight={hHeight}
        draggable
      >
        <div>Pane</div>
      </Pane>
    );

    const renderedPane = getByTestId("pane");

    expect(renderedPane).toBeInTheDocument();

    expect(renderedPane).toHaveStyle(`
        width: 100%;
        height: ${hHeight};
    `);
  });

  it("renders correctly (bottom)", () => {
    const { getByTestId } = render(
      <Pane
        name="test-pane"
        position="bottom"
        vWidth={vWidth}
        hHeight={hHeight}
        draggable
      >
        <div>Pane</div>
      </Pane>
    );

    const renderedPane = getByTestId("pane");

    expect(renderedPane).toBeInTheDocument();

    expect(renderedPane).toHaveStyle(`
        width: 100%;
        height: ${hHeight};
    `);
  });

  it("has drag handle (draggable)", () => {
    const { getByTestId } = render(
      <Pane
        name="test-pane"
        position="right"
        vWidth={vWidth}
        hHeight={hHeight}
        draggable
      >
        <div>Pane</div>
      </Pane>
    );

    const dragHandle = getByTestId("drag-handle");

    expect(dragHandle).toBeInTheDocument();
  });

  it("No drag handle (undraggable))", () => {
    const { queryByTestId } = render(
      <Pane
        name="test-pane"
        position="right"
        vWidth={vWidth}
        hHeight={hHeight}
        draggable={false}
      >
        <div>Pane</div>
      </Pane>
    );

    const dragHandle = queryByTestId("drag-handle");

    expect(dragHandle).not.toBeInTheDocument();
  });
});
