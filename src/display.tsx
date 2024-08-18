import { swatchesSignal, selectedSwatchSignal } from "./swatchSignal.ts";

export default function Display() {
  const colour = swatchesSignal.value[selectedSwatchSignal.value];
  return (
    <div
      id="colorRectangle"
      style={{
        backgroundColor: `hsl(${colour.hue},${colour.sat}%,${colour.lum}%)`,
      }}
    ></div>
  );
}
