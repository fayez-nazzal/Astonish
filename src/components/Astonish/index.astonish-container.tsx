/** @jsxImportSource @theme-ui/core */
import React, { useEffect } from "react";
import { AstonishProps } from "./index.types";

import "./index.styles.scss";
import "../../global.scss";

import { AnimatePresence } from "framer-motion";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { DropArea } from "./index.droparea";
import { SLIDE_DEFAULT_TRANSITION } from "../Slide/index.const";
import { AstonishContext } from "../../contexts/AstonishContext";
import { EPanePossiblePosition } from "../Pane/index.types";
import { useState } from "react";

const AstonishContainer: React.FC<AstonishProps> = ({
  children,
  infiniteControls,
  sx,
  innerSx,
  slideSx,
  defaultSlideTransition = SLIDE_DEFAULT_TRANSITION,
}) => {
  const {
    currentSlide,
    setCurrentSlide,
    slides,
    setSlides,
    sharedComponents,
    setSharedComponents,
    controls,
    setControls,
    disableTransition,
    setDisableTransition,
    activeDnDId,
    setActiveDnDId,
    numberOfSlides,
    setNumberOfSlides,
    panePositions,
    setPanePositions,
  } = React.useContext(AstonishContext);
  const [panes, setPanes] = useState<JSX.Element[]>([]);

  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit ( this is a workaround for the vh unit not working on mobile devices )
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
      childName;

      if (childName === "Slide") numberOfSlides++;
    });

    setNumberOfSlides(numberOfSlides);
    numberOfSlides;
  }, [children]);

  // get components to render
  useEffect(() => {
    numberOfSlides;

    if (numberOfSlides === 0) return;

    let currentLoopedSlideIndex = 0;
    const slides = [];
    const controls = [];
    const sharedComponents = [];
    const newPanes = [];

    React.Children.forEach(children, (child: JSX.Element, index) => {
      const childName = child.type.displayName || child.type;

      if (childName === "Slide") {
        slides.push(
          <AnimatePresence key={`astonish-Slide-${index}`}>
            {React.cloneElement(child, {
              _disableTransition: disableTransition,
              _disableInitialTransition: currentLoopedSlideIndex === 0,
              _defaultTransition: defaultSlideTransition,
              sx: {
                backgroundColor: "background",
                ...slideSx,
                ...child.props.sx,
              },
              key: `astonish-preview-slide-${index}`,
            })}
          </AnimatePresence>
        );

        currentLoopedSlideIndex++;
      } else if (childName === "Shared") {
        sharedComponents.push(
          React.cloneElement(child, {
            key: `astonish-Shared-${index}`,
          })
        );
      } else if (childName === "ArrowControls")
        controls.push(
          React.cloneElement(child, {
            key: `astonish-arrow-controls`,
          })
        );
      else if (childName === "FullScreen") {
        controls.push(
          React.cloneElement(child, {
            key: `astonish-fullscreen`,
          })
        );
      } else if (childName === "SlideNumber") {
        sharedComponents.push(
          React.cloneElement(child, {
            key: `astonish-slide-number`,
          })
        );
      } else {
        newPanes.push(child);
      }
    });

    setSlides(slides);
    slides;
    setControls(controls);
    setSharedComponents(sharedComponents);
    setPanes(newPanes);

    // autofocus astonish
    ref.current!.focus();
  }, [children, currentSlide, numberOfSlides]);

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

    setPanePositions({
      ...panePositions,
      [event.active.id]: position,
    });
  };

  return (
    <DndContext
      onDragEnd={onDragEnd}
      onDragStart={(event) => setActiveDnDId(event.active.id)}
    >
      <div
        className="astonish"
        data-testid="astonish"
        tabIndex={0}
        onKeyDown={onKeyDown}
        ref={ref}
        sx={{ bg: "background", ...sx }}
      >
        {Object.values(EPanePossiblePosition).map((position) => (
          <React.Fragment key={`pane-area-${position}`}>
            <DropArea position={position} />
            <div id={`content-${position}`}></div>
          </React.Fragment>
        ))}

        {panes}

        <div
          className="astonish-inner"
          onKeyDown={onKeyDown}
          data-testid="astonish-inner"
          sx={{ bg: "background", ...sx, ...innerSx }}
        >
          {sharedComponents}

          {slides.map((slide, index) => {
            return index < currentSlide - 2 ||
              index > currentSlide ? undefined : (
              <div
                key={`slide-wrapper-${index}`}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: index === currentSlide ? 10 : undefined,
                  pointerEvents: index === currentSlide ? "auto" : "none",
                }}
              >
                {slide}
              </div>
            );
          })}

          <div className="astonish-controls">{controls}</div>
        </div>
      </div>

      <DragOverlay>
        {activeDnDId ? (
          <div
            sx={{
              width: "100%",
              height: "100%",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

AstonishContainer.displayName = "Astonish";

export default AstonishContainer;
