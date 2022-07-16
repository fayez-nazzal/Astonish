import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import FullScreen from ".";
import Astonish from "../Astonish";
import Slide from "../Slide";

describe("Testing FullScreen component", () => {
  it("is displayed", async () => {
    const component = (
      <Astonish>
        <Slide>Slide 1</Slide>

        <FullScreen />
      </Astonish>
    );

    const { queryByTestId } = render(component);

    await waitFor(() =>
      expect(queryByTestId("astonish-fullscreen")).toBeInTheDocument()
    );
  });

  it("toggle fullscreen", async () => {
    const component = (
      <Astonish>
        <Slide>Slide 1</Slide>

        <FullScreen />
      </Astonish>
    );

    const { queryByTestId } = render(component);

    await waitFor(() => {
      expect(queryByTestId("astonish-fullscreen")).toBeInTheDocument();
    });

    const fullscreen = queryByTestId("astonish-fullscreen");
    const astonishInner = queryByTestId("astonish-inner");

    astonishInner.requestFullscreen = jest.fn();

    fireEvent.click(fullscreen);

    await waitFor(() => {
      expect(astonishInner.requestFullscreen).toHaveBeenCalled();
    });

    fireEvent.click(fullscreen);

    await waitFor(() => {
      expect(astonishInner.requestFullscreen).toBeCalledTimes(2);
    });
  });
});
