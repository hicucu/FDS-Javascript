import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-decrease',
  template: `
    <button class="decrease" (click)="decrease.emit()">-</button>
  `,
  styles: [
    `
    `
  ]
})
export class DecreaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() decrease = new EventEmitter();

}
