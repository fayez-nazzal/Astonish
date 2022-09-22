/** @jsxImportSource @theme-ui/core */
import React, { ReactElement, SetStateAction, useEffect } from "react";
import { AstonishProps } from "./index.types";
import { getWrongChildrenErrorMessage } from "./index.utils";

import "./index.styles.scss";
import "../../global.scss";

import { AnimatePresence } from "framer-motion";
import AstonishLoader from "./index.loader";
import { AstonishContainer } from "./container";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { DropArea } from "./index.droparea";
import Pane from "./index.pane";
import usePrevious from "../../hooks/usePrevious";

const Astonish: React.FC<AstonishProps> = ({
  children,
  infiniteControls,
  sx,
  innerSx,
  loaderSx,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [numberOfSlides, setNumberOfSlides] = React.useState(0);
  const [slides, setSlides] = React.useState<typeof children>([]);
  const [sharedComponents, setSharedComponents] = React.useState<
    React.FunctionComponentElement<any>[]
  >([]);
  const [controls, setControls] =
    React.useState<React.FunctionComponentElement<any>[]>();
  const [disableTransition, setDisableTransition] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const [leftPanes, setLeftPanes] = React.useState<JSX.Element[]>([]);
  const [rightPanes, setRightPanes] = React.useState<JSX.Element[]>([]);
  const [topPanes, setTopPanes] = React.useState<JSX.Element[]>([]);
  const [bottomPanes, setBottomPanes] = React.useState<JSX.Element[]>([]);

  const [previewDnDPosition, setPreviewDnDPosition] = React.useState<string>();
  const previousPreviewDnDPosition = usePrevious(previewDnDPosition);

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;

    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  // count number of slides
  useEffect(() => {
    let numberOfSlides = 0;

    React.Children.forEach(children, (child: JSX.Element) => {
      const childName = child.type.displayName || child.type;

      if (
        !["Shared", "Slide", "ArrowControls", "Preview", "FullScreen"].includes(
          childName
        )
      ) {
        throw new Error(getWrongChildrenErrorMessage(childName));
      }

      if (childName === "Slide") numberOfSlides++;
    });

    setNumberOfSlides(numberOfSlides);
  }, [children]);

  // get components to render
  useEffect(() => {
    if (numberOfSlides === 0) return;

    let currentLoopedSlideIndex = 0;
    const slides = [];
    const controls = [];
    const sharedComponents = [];

    React.Children.forEach(children, (child: JSX.Element, index) => {
      // get child name
      const childName = child.type.displayName || child.type;

      if (childName === "Slide") {
        slides.push(
          <AnimatePresence key={`astonish-Slide-${index}`}>
            {React.cloneElement(child, {
              _childOfAstonish: true,
              _disableTransition: disableTransition,
              _disableInitialTransition: currentLoopedSlideIndex === 0,
              key: `astonish-preview-slide-${index}`,
            })}
          </AnimatePresence>
        );

        currentLoopedSlideIndex++;
      } else if (childName === "Shared") {
        sharedComponents.push(
          React.cloneElement(child, {
            _childOfAstonish: true,
            key: `astonish-Shared-${index}`,
          })
        );
      } else if (childName === "ArrowControls")
        controls.push(
          React.cloneElement(child, {
            _onNext,
            _onPrevious,
            _onNextDisabled:
              !infiniteControls && currentSlide === numberOfSlides - 1,
            _onPreviousDisabled: !infiniteControls && currentSlide === 0,
            _childOfAstonish: true,
            key: `astonish-arrow-controls`,
          })
        );
      else if (childName === "Preview") {
        const previewPosition =
          previewDnDPosition ?? (child.props.initialPosition || "left");

        const previewComponent = React.cloneElement(child, {
          _childOfAstonish: true,
          _children: slides,
          _goToSlide,
          _currentSlide: currentSlide,
          key: "astonish-preview",
          initialPosition: previewPosition,
        });

        setPreviewDnDPosition(previewPosition);

        const pane =
          previewPosition === "left"
            ? leftPanes
            : previewPosition === "right"
            ? rightPanes
            : previewPosition === "top"
            ? topPanes
            : bottomPanes;

        if (previousPreviewDnDPosition === previewDnDPosition) {
          const previewPaneIndex = pane.findIndex(
            (p) => p.props.name === "Preview"
          );

          if (previewPaneIndex !== -1) {
            pane[previewPaneIndex] = (
              <Pane
                draggable
                key="preview"
                name="Preview"
                position={previewPosition}
              >
                {previewComponent}
              </Pane>
            );
          }
        } else {
          if (!!previousPreviewDnDPosition) {
            const previousPaneSetter =
              previousPreviewDnDPosition === "left"
                ? setLeftPanes
                : previousPreviewDnDPosition === "right"
                ? setRightPanes
                : previousPreviewDnDPosition === "top"
                ? setTopPanes
                : setBottomPanes;

            previousPaneSetter((previousPane) =>
              previousPane.filter((child) => {
                return child.props.name !== "Preview";
              })
            );
          }

          // add preview to pane
          pane.push(
            <Pane
              position={previewPosition}
              draggable
              key="preview"
              name="Preview"
            >
              {previewComponent}
            </Pane>
          );

          if (previewPosition === "left") setLeftPanes(pane);
          else if (previewPosition === "right") setRightPanes(pane);
          else if (previewPosition === "top") setTopPanes(pane);
          else setBottomPanes(pane);
        }
      } else if (childName === "FullScreen") {
        controls.push(
          React.cloneElement(child, {
            _childOfAstonish: true,
            key: `astonish-fullscreen`,
          })
        );
      }
    });

    setSlides(slides);
    setControls(controls);
    setSharedComponents(sharedComponents);

    // autofocus astonish
    ref.current!.focus();
  }, [children, currentSlide, numberOfSlides, previewDnDPosition]);

  const _goToSlide = (slideIndex: number) => {
    setDisableTransition(true);
    setCurrentSlide(slideIndex);
  };

  const _onPrevious = () => {
    setDisableTransition(true);

    const previousSlide =
      currentSlide - 1 < 0
        ? infiniteControls
          ? numberOfSlides - 1
          : 0
        : currentSlide - 1;

    setCurrentSlide(previousSlide);
  };

  const _onNext = () => {
    setDisableTransition(false);

    const nextSlide = infiniteControls
      ? (currentSlide + 1) % numberOfSlides
      : currentSlide + 1 >= numberOfSlides
      ? numberOfSlides - 1
      : currentSlide + 1;

    setCurrentSlide(nextSlide);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "PageDown") {
      _onPrevious();
      e.preventDefault();
    }

    if (
      e.key === "ArrowRight" ||
      e.key === " " ||
      e.key === "Enter" ||
      e.key == "Space" ||
      e.key === "PageUp"
    ) {
      _onNext();
      e.preventDefault();
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    if (typeof event.over.id !== "string" || !event.over) return;

    const position = (event.over.id as string).match(
      /droppable-(.*)/
    )[1] as string;

    if ((event.active.id as string).toLowerCase().includes("preview")) {
      setPreviewDnDPosition(position);
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <AstonishContainer>
        <div
          className="astonish"
          data-testid="astonish"
          tabIndex={0}
          onKeyDown={onKeyDown}
          ref={ref}
          sx={{ bg: "background", ...sx }}
        >
          <AstonishLoader numberOfSlides={numberOfSlides} sx={loaderSx} />

          <DropArea position="right" />
          <DropArea position="left" />
          <DropArea position="top" />
          <DropArea position="bottom" />

          <div className="content-left">{leftPanes}</div>
          <div className="content-right">{rightPanes}</div>
          <div className="content-top">{topPanes}</div>
          <div className="content-bottom">{bottomPanes}</div>

          <div
            className="astonish-inner"
            onKeyDown={onKeyDown}
            data-testid="astonish-inner"
            sx={{ ...innerSx }}
          >
            {sharedComponents}

            <div
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {slides[currentSlide]}
            </div>

            <div className="astonish-controls">{controls}</div>
          </div>
        </div>
      </AstonishContainer>
    </DndContext>
  );
};

Astonish.displayName = "Astonish";

export default Astonish;
