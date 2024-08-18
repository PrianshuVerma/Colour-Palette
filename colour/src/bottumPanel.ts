import { makeFillRowLayout } from "../../simplekit/layout";
import { SKLabel, SKContainer } from "../../simplekit/widget";

import { Observer } from "./observer";
import { SwatchModel } from "./swatchModel";

export class BottumPanelPanel extends SKContainer implements Observer {

  messageText: string = "";
  update(): void{
    this.messageText = `${this.swatchModel.totalSwatches} swatches (selected #${this.swatchModel.currentSwatch + 1})`;
    this.message.text = this.messageText;
  }

  message: SKLabel = new SKLabel(this.messageText);
  constructor(private swatchModel: SwatchModel) {
    super();

    // setup the view
    this.id = "ButtomPanel";
    this.fill = "lightgrey";
    this.fillWidth = 1;
    this.height = 50;
    this.layoutMethod = makeFillRowLayout();

    this.message.align = "right";
    this.message.fillWidth = 1;
    this.message.box.padding = 15;
    this.addChild(this.message);


    this.swatchModel.addObserver(this);



  }

}