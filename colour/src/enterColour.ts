import { SKContainer, SKLabel, SKTextfield } from "../../simplekit/widget";
import * as Layout from "../../simplekit/layout";

import { Observer } from "./observer";
import { SwatchModel } from "./swatchModel";


export class enterColour extends SKContainer implements Observer {

    hue: SKLabel = new SKLabel("Hue", 20, 10);
    sat: SKLabel = new SKLabel("Sat", 20, 50);
    lum: SKLabel = new SKLabel("Lum", 20, 90);


    hueInfo: SKTextfield = new SKTextfield("", 80, 15, 100);
    satInfo: SKTextfield = new SKTextfield("", 80, 55, 100);
    lumInfo: SKTextfield = new SKTextfield("", 80, 95, 100);

  update(): void {
    this.hueInfo.text = Math.round(this.swatchModel.currentHue).toString();
    this.satInfo.text = Math.round(this.swatchModel.currentSat).toString();
    this.lumInfo.text = Math.round(this.swatchModel.currentLum).toString();
  }
    


  constructor(private swatchModel: SwatchModel) {
    super();

    // setup the view
    this.id = "enterColour";
    this.fill = "whitesmoke";
    this.border = "grey"
    this.fillWidth = 1;
    this.fillHeight = 1;


    this.hue.box.padding = 10;
    this.hue.align = "right";
    this.sat.box.padding = 10;
    this.sat.align = "right";
    this.lum.box.padding = 10;
    this.lum.align = "right";

    this.addChild(this.hue);
    this.addChild(this.sat);
    this.addChild(this.lum);

    this.addChild(this.hueInfo);
    this.addChild(this.satInfo);
    this.addChild(this.lumInfo);

    this.hueInfo.addEventListener("textchanged", (e) =>{
      const tf = e.source as SKTextfield;
      let t: string = tf.text.replace(/[^0-9]/g, ""); // simple text validation
      if (Number(t) > 360) t = "360";
      tf.text = t;
      let h = parseInt(tf.text) || 0;
      this.swatchModel.changeHue(h);
    });

    this.satInfo.addEventListener("textchanged", (e) =>{
      const tf = e.source as SKTextfield;
      let t: string = tf.text.replace(/[^0-9]/g, ""); // simple text validation
      if (Number(t) > 100) t = "100";
      tf.text = t;
      let s = parseInt(tf.text) || 0;
      this.swatchModel.changeSat(s);
    });

    this.lumInfo.addEventListener("textchanged", (e) =>{
      const tf = e.source as SKTextfield;
      let t: string = tf.text.replace(/[^0-9]/g, ""); // simple text validation
      if (Number(t) > 100) t = "100";
      tf.text = t;
      let l = parseInt(tf.text) || 0;
      this.swatchModel.changeLum(l);
    });


    this.swatchModel.addObserver(this);

  }

}