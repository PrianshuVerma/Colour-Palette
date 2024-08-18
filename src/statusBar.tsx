import { swatchesSignal, selectedSwatchSignal } from "./swatchSignal.ts";

export default function StatusBar() {
  return (
    <div id="statusBar">
      {swatchesSignal.value.length} swatches (selected #
      {selectedSwatchSignal.value + 1})
    </div>
  );
}
