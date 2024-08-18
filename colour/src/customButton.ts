import { SKButton, SKContainer } from "../../simplekit/widget";
import { SKElement } from "../../simplekit/widget/element";
import * as Style from "../../simplekit/widget/style";
import { Observer } from "./observer";
import { SwatchModel } from "./swatchModel";


export class CustomButton extends SKButton implements Observer {


    maxAdd:boolean = false;

    update(): void {
        // change colour in big rectangle
        //this.state = "down";
        if(this.swatchModel.totalSwatches == 16){
            this.maxAdd == true;
        }
        else{
            this.maxAdd = false;
        }
        
      }

      constructor(private swatchModel: SwatchModel, text: string, x: number, y: number){
        super(text, x, y);
      }

      draw(gc: CanvasRenderingContext2D) {
        // to save typing "this" so much
        const box = this.box;
    
        gc.save();
    
        const w = box.paddingBox.width;
        const h = box.paddingBox.height;
    
        gc.translate(this.box.margin, this.box.margin);
    
        // thick highlight rect
        if (this.state == "hover" || this.state == "down") {
          gc.beginPath();
          gc.roundRect(this.x, this.y, w, h, 4);
          gc.strokeStyle = Style.highlightColour;
          gc.lineWidth = 8;
          gc.stroke();
        }
    
        // normal background
        gc.beginPath();
        gc.roundRect(this.x, this.y, w, h, 4);
        gc.fillStyle =
          this.state == "down" ? Style.highlightColour : "lightgrey";
        if(this.maxAdd){
            this.state = "idle";
            gc.fillStyle = "blue";
        }
        gc.strokeStyle = "black";
        // change fill to show down state
        gc.lineWidth = this.state == "down" ? 4 : 2;
        gc.fill();
        gc.stroke();
        gc.clip(); // clip text if it's wider than text area
    
        // button label
        gc.font = Style.font;
        gc.fillStyle = "black";
        gc.textAlign = "center";
        gc.textBaseline = "middle";
        gc.fillText(this.text, this.x + w / 2, this.y + h / 2);
    
        gc.restore();
    
        // element draws debug viz if flag is set
        super.draw(gc);
      }
}