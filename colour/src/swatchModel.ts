import { Subject } from "./observer";

export class SwatchModel extends Subject {
  // model data (i.e. model state)
  private _currentSwatch = 0;
  private _currentHue = 0;
  private _currentSat = 0;
  private _currentLum = 0;
  private _totalSwatches = 10;

  get currentSwatch() {
    return this._currentSwatch;
  }

  get currentColour() {
    return `hsl(${this._currentHue}, ${this._currentSat}%, ${this._currentLum}%)`;
  }

  get currentHue() {
    return this._currentHue;
  }

  get currentSat() {
    return this._currentSat;
  }

  get currentLum() {
    return this._currentLum;
  }

  get totalSwatches(){
    return this._totalSwatches;
  }

  changeHue(h: number){
    this._currentHue = h;
    this.notifyObservers();
  }

  changeSat(s: number){
    this._currentSat = s;
    this.notifyObservers();
  }

  changeLum(l: number){
    this._currentLum = l;
    this.notifyObservers();
  }

  changeid(i: number){
    this._currentSwatch = i;
    this.notifyObservers();
  }

  justChange(h: number, s: number, l: number){
    this._currentHue = h;
  }

  // model "business logic"
  changeSwatch(id: number, h: number, s: number, l: number) {

    this._currentSwatch = id;
    this._currentHue = h;
    this._currentSat = s;
    this._currentLum = l;
    // need to notify observers anytime the model changes
    this.notifyObservers();
  }

  addSwatch (){
    if (this.totalSwatches < 16){
      
      this._totalSwatches ++;
      this.notifyObservers();
    }
    
  }

  deleteSwatch (){
    if (this.totalSwatches > 0){
      
      this._totalSwatches --;
      this.notifyObservers();
    }
    
  }
}