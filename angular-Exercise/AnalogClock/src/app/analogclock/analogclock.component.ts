import { Component } from '@angular/core';

interface hand{
  transform: string;
}

@Component({
  selector: 'app-analogclock',
  template: `
  <div class="clock">
    <div class="analog-clock">
      <div class="hour hand" [ngStyle]="handHH"></div>
      <div class="minute hand" [ngStyle]="handMM"></div>
      <div class="second hand" [ngStyle]="handSS"></div>
      <div class="center-circle"></div>
    </div>
    <div class="digital-clock">{{dispHH}}:{{dispMM}}:{{dispSS}}</div>
  </div>
  `,
  styles: [
    `
    .analog-clock {
      position: relative;
      margin: 100px auto 0;
      width: 200px;
      height: 200px;
      background-color: aliceblue;
      border-radius: 50%;
    }

    .hand {
      position: absolute;
      left: 50%;
      width: 1px;
      height: 100px;
      /* 자바스크립트에 의해 덮어써진다. */
      /* transform: translate3d(-50%, 0, 0); */
      transform-origin: 100% 100%;
    }

    .hour {
      background-color: #f44336;
    }

    .minute {
      background-color: #3f51b5;
    }

    .second {
      background-color: #9e9e9e;
    }

    .center-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 50%;
    }

    .digital-clock {
      position: absolute;
      top: 350px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      font-size: 2em;
      font-family: 'Source Code Pro', monospace;
    }
    `
  ]
})
export class AnalogclockComponent {
  thisHH:number;
  thisMM:number;
  thisSS:number;
  thisMS:number;
  dispHH:string;
  dispMM:string;
  dispSS:string;
  
  handHH:hand;
  handMM:hand;
  handSS:hand;

  clock() {
      this.thisSS += 1;

    if(this.thisSS===60){
      this.thisMM+=1;
      this.thisSS = 0;
    }

    if(this.thisMM === 60) {
      this.thisHH+=1;
      this.thisMM = 0;
    }

    if(this.thisHH === 24) {
      this.thisHH = 0;
    }    

    this.handSS = { transform : `rotate(${(this.thisSS*6)}deg)` };
    this.handMM = { transform : `rotate(${((this.thisMM+(this.thisSS/60))*6)}deg)` };
    this.handHH = { transform : `rotate(${(this.thisHH+(this.thisSS/3600))*30}deg)` };
    
    this.dispHH = ('0'+this.thisHH).slice(-2);
    this.dispMM = ('0'+this.thisMM).slice(-2);
    this.dispSS = ('0'+this.thisSS).slice(-2);
  }

  constructor() { 
    let time = new Date();
    this.thisHH = time.getHours();
    this.thisMM = time.getMinutes();
    this.thisSS = time.getSeconds();
    
    
    setInterval(()=>{this.clock()}, 1000);
  }

}
