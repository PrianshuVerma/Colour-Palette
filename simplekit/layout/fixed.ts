import { SKElement } from "../widget";
import { LayoutMethod, Size } from ".";

export function makeFixedLayout(params: {} = {}): LayoutMethod {
  return (
    boundsWidth: number,
    boundsHeight: number,
    elements: SKElement[]
  ) => {
    return fixedLayout(boundsWidth, boundsHeight, elements, params);
  };
}

function fixedLayout(
  boundsWidth: number,
  boundsHeight: number,
  elements: SKElement[],
  params: {}
): Size {
  const newBounds: Size = { width: 0, height: 0 };

  elements.forEach((el) => {
    // warn if element is outside bounds
    if (
      el.x < 0 ||
      el.y < 0 ||
      el.x + el.box.width > boundsWidth ||
      el.y + el.box.height > boundsHeight
    ) {
      console.warn(`element ${el.toString()} outside parent bounds`);
    }

    // update bounds that were actually used
    // note, we ignore margins for fixed layout
    newBounds.width = Math.max(newBounds.width, el.x + el.box.width);
    newBounds.height = Math.max(
      newBounds.height,
      el.y + el.box.height
    );
  });

  return newBounds;
}
