import { Component, Output, EventEmitter } from '@angular/core';

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
export class DecreaseComponent {

  constructor() { }

  @Output() decrease = new EventEmitter<void>();

}
