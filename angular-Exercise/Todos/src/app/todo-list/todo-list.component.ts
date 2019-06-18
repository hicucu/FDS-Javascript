import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from '../iTodo';

@Component({
  selector: 'app-todo-list',
  template: `
  <ul>
    <li *ngFor="let todo of todos" [ngStyle]="isDecoration(todo.completed)">
      <input type="checkbox" [checked]="todo.completed" (change)="toggleTodo(todo.id)">
      <label>{{todo.content}}</label>
      <button (click)="removeTodo(todo.id)">X</button>
    </li>
  </ul>
  `,
  styles: []
})
export class TodoListComponent {
  @Input() todos:ITodo[];
  @Output() toggle = new EventEmitter();
  @Output() remove = new EventEmitter();

  toggleTodo(id:number) {
    this.toggle.emit(id);
  }
  removeTodo(id:number) {
    this.remove.emit(id);
  }

  isDecoration(completed:boolean){
    return {"text-decoration": completed? "line-through" : "none"}
  }

}
