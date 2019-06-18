import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  template: `
    <input type="text" placeholder="Enter todo" (keyup.enter)="addTodo(input)" #input>
  `,
  styles: []
})
export class TodoInputComponent {
  @Output() add = new EventEmitter();

  addTodo(input:HTMLInputElement) {
    this.add.emit(input.value);
    input.value = '';
  }

}
