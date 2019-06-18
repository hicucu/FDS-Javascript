import { Component } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  template: `
  <div class="stop-watch">
    <div class="display">{{dispHH}}:{{dispMM}}:{{dispSS}}</div>
    <button class="control" (click)='toggleStatus()'>{{buttonStatus}}</button>
  </div>
  `,
  styles: [
    `
    .stop-watch {
      font-family: 'Source Code Pro', monospace;
      text-align: center;
      font-size: 3em;
      padding: 30px;
    }

    .control {
      width: 300px;
      padding: 5px;
      margin-top: 15px;
      font-size: 36px;
      font-weight: bold;
      border: 2px solid #f44336;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
    }

    .control:hover {
      background: #f44336;
      color: aliceblue;
    }
    `
  ]
})
export class StopwatchComponent{

  status = false;
  buttonStatus = "Start";
  ss = 0;
  dispHH = '00';
  dispMM = '00';
  dispSS = '00';
  interval;

  constructor() { }

  timer() {
    this.ss +=1;
    
  
    this.dispSS = ('0'+ (this.ss % 100)).slice(-2);

    if (!(this.ss % 100)) {
      this.dispMM = ('0'+(Number.parseInt(this.dispMM)+1)).slice(-2);
    }

    if (!(this.ss % 6000)) {
      this.dispHH = ('0'+(Number.parseInt(this.dispHH)+1)).slice(-2);
      this.dispMM = '00';
    }

    

    
    
  }

  toggleStatus() {    
    
    if (this.status) {
      this.buttonStatus = "Start";
      clearInterval(this.interval);
    }
    else { this.buttonStatus = "Stop";
      this.interval = setInterval(()=>{this.timer()}, 10);      
    }

    this.status = !this.status;
    
  }
}
