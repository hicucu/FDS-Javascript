import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
  <div class="container">
    <button class="increase" (click)="increase()">+</button>
    <div class="counter">{{counter}}</div>
    <button class="decrease" (click)="decrease()">-</button>
  </div>
  `,
  styles: [ 
    `
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 130px;
      margin: 20px auto;
      font-size: 24px;
      color: #3f51b5;
    }

    button {
      padding: 5px 10px;
      font-size: 24px;
      border-radius: 5px;
      color: #3f51b5;
      border-color: #3f51b5;
      outline: none;
      cursor: pointer;
    }

    .counter {
      width: 50px;
      text-align: center;
    }
    `
  ]
})
export class AppComponent {
  title = 'Counter';
  counter:number = 0;

  increase() {
    this.counter += 1;
  }
  decrease() {
    if(this.counter > 0)
        this.counter -= 1;
  }
}
