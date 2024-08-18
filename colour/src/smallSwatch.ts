import { SKContainer } from "../../simplekit/widget";

import { Observer } from "./observer";
import { SwatchModel } from "./swatchModel";

export class SmallSwatch extends SKContainer implements Observer{

    update(): void {
        if (this.id == this.swatchModel.currentSwatch.toString()){
            this.border = "black";
            this.fill = this.swatchModel.currentColour;
            this.localHue = this.swatchModel.currentHue;
            this.localSat = this.swatchModel.currentSat;
            this.localLum = this.swatchModel.currentLum;

        }
        else{
            this.border = "";
        }
    }

    localHue: number = 0;
    localSat: number = 0;
    localLum: number = 0;

  constructor( hue: number, sat: number, lum: number, id: number, private swatchModel: SwatchModel) {
    super();

    // setup the view
    this.id = id.toString();
    this.width = 50;
    this.height = 50;
    this.fill = `hsl(${hue}, ${sat}%, ${lum}%)`;

    this.localHue = hue;
    this.localSat = sat;
    this.localLum = lum;

    this.addEventListener("action", () => {
        this.swatchModel.changeSwatch(Number(this.id), this.localHue, this.localSat, this.localLum);
    })


    // add a button to the view

    this.swatchModel.addObserver(this);

  }

}