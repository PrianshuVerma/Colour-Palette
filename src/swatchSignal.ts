import { signal } from '@preact/signals';

interface Swatch {
  hue: number;
  sat: number;
  lum: number;
}

export const selectedSwatchSignal = signal<number>(0);
export const swatchesSignal = signal<Swatch[]>(generateInitialSwatches());
export const colourFormatSignal = signal<string>("HSL");


function generateRandomSwatch(): Swatch {
  return {
    hue: Math.floor(Math.random() * 361),
    sat: Math.floor(Math.random() * 101),
    lum: Math.floor(Math.random() * 101),
  };
}

function generateInitialSwatches(): Swatch[] {
  const initialSwatches: Swatch[] = [];
  for (let i = 0; i < 10; i++) {
    initialSwatches.push(generateRandomSwatch());
  }
  return initialSwatches;
}

export function addSwatch() {
  const swatches = swatchesSignal.value.length;
  if (swatches < 16) {
    const newSwatch = generateRandomSwatch();
    swatchesSignal.value = [...swatchesSignal.value, newSwatch];
    selectedSwatchSignal.value = swatches;
  }
}

export function deleteSwatch() {
  const selectedSwatch = selectedSwatchSignal.value;
  const swatches = swatchesSignal.value.length;

  if (swatches > 1) {
    const updatedSwatches = swatchesSignal.value.filter((_, index) => index !== selectedSwatch);
    swatchesSignal.value = updatedSwatches;
    if ( selectedSwatchSignal.value != 0){
        selectedSwatchSignal.value--;
    }
  }
}

export function setSwatch(i: number){
    selectedSwatchSignal.value = i;
}

export function updateSwatchColor(property: string, value: number) {
    const swatch = swatchesSignal.value[selectedSwatchSignal.value];
    
    if(property == 'hue'){
        swatch.hue = clamp(value, 0, 360);
    }

    else if(property == 'sat'){
        swatch.sat = clamp(value, 0, 100);
    }

    else if(property == 'lum'){
        swatch.lum = clamp(value, 0, 100);
    }

    swatchesSignal.value = [...swatchesSignal.value];
  }

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }