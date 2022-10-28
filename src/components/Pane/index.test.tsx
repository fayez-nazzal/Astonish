import { render } from "@testing-library/react";
import Pane from ".";

const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

describe("Testing Pane element", () => {
  const widthVertical = "200px";
  const heightHorizontal = "200px";

  it("renders correctly (left)", () => {
    const { getByTestId } = render(
      <Pane
        id="test-pane"
        name="test-pane"
        defaultPosition="left"
        width={widthVertical}
        height={heightHorizontal}
        draggable
      >
        <div>Pane</div>
      </Pane>
    );

    const renderedPane = getByTestId("pane");

    expect(renderedPane).toBeInTheDocument();

    expect(renderedPane).toHaveStyle(`
        width: ${widthVertical};
        height: 100%;
    `);
  });

  it("renders correctly (right)", () => {
    const { getByTestId } = render(
      <Pane
        id="test-pane"
        name="test-pane"
        defaultPosition="right"
        width={widthVertical}
        height={heightHorizontal}
        draggable={false}
      >
        <div>Pane</div>
      </Pane>
    );

    const renderedPane = getByTestId("pane");

    expect(renderedPane).toBeInTheDocument();

    expect(renderedPane).toHaveStyle(`
        width: ${widthVertical};
        height: 100%;
    `);
  });

  it("renders correctly (top)", () => {
    const { getByTestId } = render(
      <Pane
        id="test-pane"
        name="test-pane"
        defaultPosition="top"
        width={widthVertical}
        height={heightHorizontal}
        draggable
      >
        <div>Pane</div>
      </Pane>
    );

    const renderedPane = getByTestId("pane");

    expect(renderedPane).toBeInTheDocument();

    expect(renderedPane).toHaveStyle(`
        width: 100%;
        height: ${heightHorizontal};
    `);
  });

  it("renders correctly (bottom)", () => {
    const { getByTestId } = render(
      <Pane
        id="test-pane"
        name="test-pane"
        defaultPosition="bottom"
        width={widthVertical}
        height={heightHorizontal}
        draggable
      >
        <div>Pane</div>
      </Pane>
    );

    const renderedPane = getByTestId("pane");

    expect(renderedPane).toBeInTheDocument();

    expect(renderedPane).toHaveStyle(`
        width: 100%;
        height: ${heightHorizontal};
    `);
  });

  it("has drag handle (draggable)", () => {
    const { getByTestId } = render(
      <Pane
        id="test-pane"
        name="test-pane"
        defaultPosition="right"
        width={widthVertical}
        height={heightHorizontal}
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
        id="test-pane"
        name="test-pane"
        defaultPosition="right"
        width={widthVertical}
        height={heightHorizontal}
        draggable={false}
      >
        <div>Pane</div>
      </Pane>
    );

    const dragHandle = queryByTestId("drag-handle");

    expect(dragHandle).not.toBeInTheDocument();
  });
});
