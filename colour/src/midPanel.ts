import { SKContainer } from "../../simplekit/widget";
import * as Layout from "../../simplekit/layout";
import { enterColour } from "./enterColour";

import { Observer } from "./observer";
import { SwatchModel } from "./swatchModel";

export class MidPanel extends SKContainer implements Observer{

  update(): void {
    // change colour in big rectangle
    this.viewColour.fill = this.swatchModel.currentColour;
  }

  viewColour : SKContainer = new SKContainer();
  enterColour : SKContainer = new SKContainer();

  constructor(private swatchModel: SwatchModel) {
    super();

    // setup the view
    this.id = "Middle panel";
    this.fillWidth = 1;
    this.fillHeight = 1;
    //this.debug = true;
    this.box.padding = 10;
    this.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

    this.viewColour.fillWidth = 2;
    this.viewColour.fillHeight = 1;
    this.viewColour.fill = "green";
    this.viewColour.border = "black"

    this.addChild(this.viewColour);
    this.addChild(new enterColour(swatchModel));

    this.swatchModel.addObserver(this);

  }

}