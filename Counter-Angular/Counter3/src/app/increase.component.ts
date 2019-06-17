import { Component, Output, EventEmitter } from '@angular/core';

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
export class IncreaseComponent {

  constructor() { }

  @Output() increase = new EventEmitter<void>();

}
