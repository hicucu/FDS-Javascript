import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button (click)="onClick.emit()">{{print}}</button>
  `,
  styles: [
    `
    button {
      padding: 5px 10px;
      font-size: 24px;
      border-radius: 5px;
      color: #3f51b5;
      border-color: #3f51b5;
      outline: none;
      cursor: pointer;
    }
    `
  ]
})
export class ButtonComponent {

  constructor() { }

  @Input() print:string;
  @Output() onClick = new EventEmitter<void>();  

}
