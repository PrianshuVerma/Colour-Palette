import {
  selectedSwatchSignal,
  swatchesSignal,
  updateSwatchColor,
  colourFormatSignal,
} from "./swatchSignal.ts";

import { hslToRgb, rgbToHsl, isValidHex, hexToHsl, hslToHex } from "./utils";

import { useState, useEffect } from "preact/hooks";

export default function Form() {
  return (
    <form id="colorForm">
      <div id="radio">
        <input
          type="radio"
          id="hsl"
          name="colorFormat"
          checked={colourFormatSignal.value === "HSL"}
          onClick={() => (colourFormatSignal.value = "HSL")}
        />
        <label for="hsl">HSL</label>

        <input
          type="radio"
          id="rgb"
          name="colorFormat"
          checked={colourFormatSignal.value === "RGB"}
          onClick={() => (colourFormatSignal.value = "RGB")}
        />
        <label for="rgb">RGB</label>

        <input
          type="radio"
          id="hex"
          name="colorFormat"
          checked={colourFormatSignal.value === "Hex"}
          onClick={() => (colourFormatSignal.value = "Hex")}
        />
        <label for="hex">Hex</label>
      </div>

      <>
        {colourFormatSignal.value === "HSL" && <HSL />}

        {colourFormatSignal.value === "RGB" && <RGB />}

        {colourFormatSignal.value === "Hex" && <Hex />}
      </>
    </form>
  );
}

function HSL() {
  const swatch = swatchesSignal.value[selectedSwatchSignal.value];
  return (
    <>
      <div class="formItem">
        <label for="hueInput">Hue:</label>
        <input
          type="number"
          min="0"
          max="360"
          id="hueInput"
          class="numberInput"
          value={swatch.hue || 0}
          onInput={(e) =>
            updateSwatchColor("hue", parseInt(e.currentTarget.value))
          }
        />
        <input
          type="range"
          min="0"
          max="360"
          id="HueSlider"
          value={swatch.hue || 0}
          onInput={(e) =>
            updateSwatchColor("hue", parseInt(e.currentTarget.value))
          }
        />
      </div>
      <div class="formItem">
        <label for="satInput">Sat:</label>
        <input
          type="number"
          min="0"
          max="100"
          id="satInput"
          class="numberInput"
          value={swatch.sat || 0}
          onInput={(e) =>
            updateSwatchColor("sat", parseInt(e.currentTarget.value))
          }
        />
        <input
          type="range"
          min="0"
          max="100"
          id="SatSlider"
          value={swatch.sat || 0}
          onInput={(e) =>
            updateSwatchColor("sat", parseInt(e.currentTarget.value))
          }
        />
      </div>
      <div class="formItem">
        <label for="lumInput">Lum:</label>
        <input
          type="number"
          min="0"
          max="100"
          id="lumInput"
          class="numberInput"
          value={swatch.lum || 0}
          onInput={(e) =>
            updateSwatchColor("lum", parseInt(e.currentTarget.value))
          }
        />
        <input
          type="range"
          min="0"
          max="100"
          id="LumSlider"
          value={swatch.lum || 0}
          onInput={(e) =>
            updateSwatchColor("lum", parseInt(e.currentTarget.value))
          }
        />
      </div>
    </>
  );
}

function RGB() {
  const swatch = swatchesSignal.value[selectedSwatchSignal.value];
  const { r, g, b } = hslToRgb(swatch.hue, swatch.sat, swatch.lum); // Convert HSL to RGB

  // Define the event handlers for RGB inputs
  const handleRgbInput = (colorComponent: string, value: number) => {
    const rgb = {
      ...hslToRgb(swatch.hue, swatch.sat, swatch.lum),
      [colorComponent]: value,
    };
    const newHsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    updateSwatchColor("hue", newHsl.h);
    updateSwatchColor("sat", newHsl.s);
    updateSwatchColor("lum", newHsl.l);
  };

  return (
    <>
      <div class="formItem">
        <label for="rInput">R:</label>
        <input
          type="number"
          min="0"
          max="255"
          id="rInput"
          class="numberInput"
          value={r || 0}
          onInput={(e) => handleRgbInput("r", parseInt(e.currentTarget.value))}
        />
        <input
          type="range"
          min="0"
          max="255"
          id="RSlider"
          value={r || 0}
          onInput={(e) => handleRgbInput("r", parseInt(e.currentTarget.value))}
        />
      </div>
      <div class="formItem">
        <label for="gInput">G:</label>
        <input
          type="number"
          min="0"
          max="255"
          id="gInput"
          class="numberInput"
          value={g || 0}
          onInput={(e) => handleRgbInput("g", parseInt(e.currentTarget.value))}
        />
        <input
          type="range"
          min="0"
          max="255"
          id="GSlider"
          value={g || 0}
          onInput={(e) => handleRgbInput("g", parseInt(e.currentTarget.value))}
        />
      </div>
      <div class="formItem">
        <label for="bInput">B:</label>
        <input
          type="number"
          min="0"
          max="255"
          id="bInput"
          class="numberInput"
          value={b || 0}
          onInput={(e) => handleRgbInput("b", parseInt(e.currentTarget.value))}
        />
        <input
          type="range"
          min="0"
          max="255"
          id="BSlider"
          value={b || 0}
          onInput={(e) => handleRgbInput("b", parseInt(e.currentTarget.value))}
        />
      </div>
    </>
  );
}

function Hex() {
  const swatch = swatchesSignal.value[selectedSwatchSignal.value];
  const initialHex = hslToHex(swatch.hue, swatch.sat, swatch.lum);

  const [hexValue, setHexValue] = useState(initialHex);

  const handleHexInput = (value: string) => {
    setHexValue(value);

    if (isValidHex(value)) {
      const newHsl = hexToHsl(value);
      updateSwatchColor("hue", newHsl.h);
      updateSwatchColor("sat", newHsl.s);
      updateSwatchColor("lum", newHsl.l);
    }
  };

  useEffect(() => {
    setHexValue(initialHex);
  }, [swatch]);

  return (
    <div class="HexformItem">
      <input
        type="text"
        id="hexInput"
        class="numberInput"
        value={hexValue}
        onInput={(e) => handleHexInput(e.currentTarget.value)}
      />
      {/* Add error message display if hex is invalid */}
      {!isValidHex(hexValue) && (
        <div class="errorMessage">Invalid: must be a valid hex color</div>
      )}
    </div>
  );
}
