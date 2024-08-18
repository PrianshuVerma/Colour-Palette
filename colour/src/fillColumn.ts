import { SKElement } from "../../simplekit/widget";
import { LayoutMethod, Size } from "../../simplekit/layout";

export function makeColumnRowLayout(
  params: { gap: number } = { gap: 0 }
): LayoutMethod {
  return (
    boundsWidth: number,
    boundsHeight: number,
    elements: SKElement[]
  ) => {
    return fillColumnLayout(boundsWidth, boundsHeight, elements, params);
  };
}

function fillColumnLayout(
  boundsWidth: number,
  boundsHeight: number,
  elements: SKElement[],
  params: { gap: number }
): Size {
  const newBounds: Size = { width: 0, height: 0 };
  const gap = params.gap;

  // get total "basis" width
  const basisTotal = elements.reduce(
    (acc, el) => acc + el.box.fullHeight,
    0
  );

  // calculate remaining space to distribute elements
  const remaining =
    boundsHeight - basisTotal - (elements.length - 1) * gap;

  // get total fill proportion
  const fillTotal = elements.reduce(
    (acc, el) => acc + el.fillHeight,
    0
  );

  // first element starts at top left
  let x = 0;
  let y = 0;
  let columnWidth = 0;

  elements.forEach((el) => {
    // set element position
    el.x = x;
    el.y = y;

    // calculate element size
    let h = el.box.fullHeight;
    // expand or shrink element if fillWidth > 0
    if (fillTotal > 0) {
      h += (el.fillHeight / fillTotal) * remaining;
    }
    // set element size
    el.box.fullHeight = h;

    // elements can expand vertically too
    if (el.fillWidth > 0) {
      el.box.fullWidth = boundsWidth;
    }
    // update row height
    columnWidth = Math.max(columnWidth, el.box.fullWidth);
    // ready for next x position
    y += h + gap;
  });

  // calculate bounds used for layout
  const lastEl = elements.slice(-1)[0];
  newBounds.height = lastEl.y + lastEl.box.fullHeight;
  newBounds.width = columnWidth;

  return newBounds;
}