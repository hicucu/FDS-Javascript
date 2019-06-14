import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-increase',
  template: `
    <button class="increase" (click)="increase.emit()">+</button>
  `,
  styles: [
    `
    `
  ]
})
export class IncreaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  @Output() increase = new EventEmitter();

}
