import { addSwatch, deleteSwatch, swatchesSignal } from "./swatchSignal.ts";

export default function Toolbar() {
  return (
    <div id="toolbar">
      <button
        id="addButton"
        onClick={addSwatch}
        disabled={swatchesSignal.value.length > 15}
      >
        Add
      </button>
      <button
        id="deleteButton"
        onClick={deleteSwatch}
        disabled={swatchesSignal.value.length < 2}
      >
        Delete
      </button>
    </div>
  );
}
