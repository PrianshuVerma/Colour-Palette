import { SKButton, SKContainer } from "../../simplekit/widget";
import * as Layout from "../../simplekit/layout";

import { Observer } from "./observer";
import { SwatchModel } from "./swatchModel";

import { CustomButton } from "./customButton";

export class TopPanel extends SKContainer {

  addB: SKButton = new CustomButton(this.swatchModel,"Add", 10, 10);
  deleteB: SKButton = new CustomButton(this.swatchModel, "Delete", 120, 10);

  constructor(private swatchModel: SwatchModel) {
    super();

    // setup the view
    this.id = "topPanel";
    this.fill = "lightgrey";
    this.fillWidth = 1;
    this.height = 50;
    //this.debug = true;

    // add a button to the view

    this.addB.width = 100;
    this.addChild(this.addB);

    this.addB.addEventListener("action", () => {
      this.swatchModel.addSwatch();
    });

    this.deleteB.addEventListener("action", () => {
      this.swatchModel.deleteSwatch();
    });

    this.deleteB.width = 100;
    this.addChild(this.deleteB);

  }

}