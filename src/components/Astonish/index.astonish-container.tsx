/** @jsxImportSource @theme-ui/core */
import React, { useEffect } from "react";
import { AstonishProps } from "./index.types";
import { getReactDeepNestedChildren } from "./index.utils";

import "./index.styles.scss";
import "../../global.scss";

import { AnimatePresence } from "framer-motion";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { DropArea } from "./index.droparea";
import Pane from "./index.pane";
import usePrevious from "../../hooks/usePrevious";
import {
  INITIAL_H_PREVIEW_WIDTH,
  INITIAL_V_PREVIEW_HEIGHT,
} from "../Preview/index.const";
import { SLIDE_DEFAULT_TRANSITION } from "../Slide/index.const";
import { AstonishContext } from "../../contexts/AstonishContext";

const AstonishContainer: React.FC<AstonishProps> = ({
  children,
  infiniteControls,
  sx,
  innerSx,
  slideSx,
  paneSx,
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
    leftPanes,
    setLeftPanes,
    rightPanes,
    setRightPanes,
    topPanes,
    setTopPanes,
    bottomPanes,
    setBottomPanes,
    previewDnDPosition,
    setPreviewDnDPosition,
    activeDnDId,
    setActiveDnDId,
    numberOfSlides,
    setNumberOfSlides,
  } = React.useContext(AstonishContext);

  const ref = React.useRef<HTMLDivElement>(null);
  const previousPreviewDnDPosition = usePrevious(previewDnDPosition);

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
    const newAstonsihChildren = [];

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
      else if (childName === "Preview") {
        const previewPosition =
          previewDnDPosition ?? (child.props.initialPosition || "left");

        const previewComponent = React.cloneElement(child, {
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

        const newPaneWithPreview = (
          <Pane
            draggable
            key="preview"
            name="Preview"
            position={previewPosition}
            defaultWidth="100%"
            defaultHeight="100%"
            vWidth={INITIAL_H_PREVIEW_WIDTH}
            hHeight={INITIAL_V_PREVIEW_HEIGHT}
            sx={paneSx}
          >
            {previewComponent}
          </Pane>
        );

        if (previousPreviewDnDPosition === previewDnDPosition) {
          const previewPaneIndex = pane.findIndex(
            (p) => p.props.name === "Preview"
          );

          if (previewPaneIndex !== -1) {
            pane[previewPaneIndex] = newPaneWithPreview;
          }
        } else {
          if (!!previousPreviewDnDPosition) {
            const previousPaneSetter = (
              previousPreviewDnDPosition === "left"
                ? setLeftPanes
                : previousPreviewDnDPosition === "right"
                ? setRightPanes
                : previousPreviewDnDPosition === "top"
                ? setTopPanes
                : setBottomPanes
            ) as any;

            previousPaneSetter((previousPane: any) =>
              previousPane.filter((child) => {
                return child.props.name !== "Preview";
              })
            );
          }

          // add preview to pane
          pane.push(newPaneWithPreview);

          if (previewPosition === "left") setLeftPanes(pane);
          else if (previewPosition === "right") setRightPanes(pane);
          else if (previewPosition === "top") setTopPanes(pane);
          else setBottomPanes(pane);
        }
      } else if (childName === "FullScreen") {
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
      }
    });

    setSlides(slides);
    slides;
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
