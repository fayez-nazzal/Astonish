import {
  FadeInTransition,
  SlideToRightTransition,
  SlideToLeftTransition,
  SlideToTopTransition,
  SlideToBottomTransition,
} from "./components/Slide/index.const";
// Export your components here using export `component` syntax
/* Each component tree may look like the following
        - ExampleComponent/
        -- index.tsx
        -- index.types.ts
        -- index.styles.scss
        -- index.stories.tsx
        -- index.test.tsx or index.spec.tsx
*/

import Astonish from "./components/Astonish";
import Slide from "./components/Slide";
import Shared from "./components/Shared";
import Preview from "./components/Preview";
import FullScreen from "./components/FullScreen";
import ArrowControls from "./components/ArrowControls";
import { createTransition } from "./components/Slide/index.utils";
import SlideNumber from "./components/SlideNumber/index";

export {
  Astonish,
  Slide,
  Shared,
  Preview,
  FullScreen,
  ArrowControls,
  createTransition,
  FadeInTransition,
  SlideToRightTransition,
  SlideToLeftTransition,
  SlideToTopTransition,
  SlideToBottomTransition,
  SlideNumber,
};
