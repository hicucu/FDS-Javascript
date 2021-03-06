import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  
  <div class="container">
    <app-button [print]="'+'" (onClick)="countIncrease()"></app-button>
    <div class="counter">{{count}}</div>
    <app-button [print]="'-'" (onClick)="countDecrease()"></app-button>
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

    .counter {
      width: 50px;
      text-align: center;
    }
    `
  ]
})
export class CounterComponent{

  constructor() { }
  
  count = 0;
  
  countIncrease() {
    this.count += 1;
  }
  countDecrease() {
    if (this.count > 0) this.count -= 1;
  }
}
