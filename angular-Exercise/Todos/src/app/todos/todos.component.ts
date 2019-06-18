import { Component } from '@angular/core';
import { ITodo } from '../iTodo';

@Component({
  selector: 'app-todos',
  template: `
  <app-todo-input (add)="addTodos($event)" ></app-todo-input>
  <app-todo-list [todos]="todos" (toggle)="toggleTodo($event)" (remove)="removeTodo($event)"></app-todo-list>
  <pre>{{todos | json}}</pre>
  `,
  styles: []
})
export class TodosComponent {

  constructor() { }
  todos:ITodo[] = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ]
  addTodos(id:string) {
    this.todos = [{id:this.generateID(), content:id, completed:false},...this.todos]
  }
  generateID() {
    return Math.max(...this.todos.map(todo => todo.id))+1;
  }

  toggleTodo(id:number) {
    this.todos = this.todos.map(todo => todo.id===id ? {...todo, completed:!todo.completed} : todo);
  }

  removeTodo(id:number) {
    this.todos = this.todos.filter(todo => todo.id!==id);
  }
}
