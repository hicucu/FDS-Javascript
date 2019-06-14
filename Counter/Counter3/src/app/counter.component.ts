import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `

  <div class="container">
  <app-increase (increase)="increase()"></app-increase>
  <div class="counter">{{counter}}</div>
  <app-decrease (decrease)="decrease()"></app-decrease>
  
  `,
  styles: []
})
export class CounterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  counter:number = 0;
  increase() {
    this.counter += 1;
  }
  decrease() {
    if (this.counter>0)
      this.counter -=1;
  }
}
