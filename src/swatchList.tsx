import {
  swatchesSignal,
  selectedSwatchSignal,
  setSwatch,
} from "./swatchSignal.ts";

export default function SwatchList() {
  return (
    <div id="swatchList">
      {swatchesSignal.value.map((swatch, index) => (
        <div
          key={index}
          class={`swatch ${
            selectedSwatchSignal.value === index ? "selected" : ""
          }`}
          style={{
            backgroundColor: `hsl(${swatch.hue},${swatch.sat}%,${swatch.lum}%)`,
          }}
          onClick={() => setSwatch(index)}
        ></div>
      ))}
    </div>
  );
}
