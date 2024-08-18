import { SKContainer, SKElement } from "../../simplekit/widget";
import * as Layout from "../../simplekit/layout";
import { SmallSwatch } from "./smallSwatch";
import { random } from "../../simplekit/utility";

import { Observer } from "./observer";
import { SwatchModel } from "./swatchModel";

export class SwatchList extends SKContainer implements Observer
{

    update(): void {
        if(this.localNumberSwatches < this.swatchModel.totalSwatches){
            this.localNumberSwatches ++;
            this.addSwatch();
        }

        if(this.localNumberSwatches > this.swatchModel.totalSwatches){
          this.localNumberSwatches --;
          this.deleteSwatch();
      }
      }

    addSwatch(): void {

        let h1:number = random(0, 360);
        let s1:number = random(0, 100);
        let l1:number = random(0, 100);

        this.addChild(new SmallSwatch(h1, s1, l1, this.localNumberSwatches - 1, this.swatchModel));
        this.swatchModel.changeSwatch(this.localNumberSwatches - 1, h1, s1, l1);
    }

    deleteSwatch(): void{
      
      //let tempSwatch: SKElement[] = this.children.filter( (el) => Number(el.id) == (this.swatchModel.currentSwatch - 1));
      let newCurrent: number = this.swatchModel.currentSwatch;
      this.removeChild(this.children[newCurrent]);
      //this.swatchModel.changeid(newCurrent);
      //change all children id
      this.children.forEach( (el) => {
        let t:number = Number(el.id);
        if (Number(el.id) > newCurrent - 1){
          el.id = `${t - 1}`;
        }})


    }

    localNumberSwatches: number = 0;

  constructor(private swatchModel: SwatchModel) {
    super();

    // setup the view
    this.id = "Swatch panel";
    this.fillWidth = 1;
    this.fillHeight = 1;

    this.box.padding = 10;
    this.layoutMethod = Layout.makeWrapRowLayout({ gap: 20 });

    this.localNumberSwatches = this.swatchModel.totalSwatches;

    for (let i = 0; i < this.swatchModel.totalSwatches; i++) {

        let h:number = random(0, 360);
        let s:number = random(0, 100);
        let l:number = random(0, 100);

        if (i == 0) {
            swatchModel.changeSwatch(i, h, s, l);
        }
        const a = new SmallSwatch(h, s, l, i, swatchModel);
      
        this.addChild(a);
      }


    // add a button to the view
    this.swatchModel.addObserver(this);

  }

}