import { Component } from "@angular/core";

import { ITodo } from "../itodo";
import { navItem } from "../nav-item.type";

@Component({
  selector: "app-todo-container",
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">4.0</div>
      <app-todo-form (add)="addTodo($event)"> </app-todo-form>
      <app-todo-nav
        [currentActive]="currentActive"
        (changeActive)="setActive($event)"
      >
      </app-todo-nav>
      <app-todo-list
        [currentActive]="currentActive"
        [todos]="todos"
        (remove)="removeTodo($event)"
        (toggle)="toggleTodo($event)"
      ></app-todo-list>
      <div [class.loading]="isLoading"></div>
      <app-todo-footer
        (toggleAllCheck)="toggleAllCheck($event)"
        (clear)="clearCompleted($event)"
        [completedTodo]="completedTodo"
        [allTodo]="allTodo"
        [isAllCompleted]="isAllCompleted"
      >
      </app-todo-footer>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 750px;
        min-width: 450px;
        margin: 0 auto;
        padding: 15px;
      }

      .title {
        /* margin: 10px 0; */
        font-size: 4.5em;
        font-weight: 100;
        text-align: center;
        color: #23b7e5;
      }

      .ver {
        font-weight: 100;
        text-align: center;
        color: #23b7e5;
        margin-bottom: 30px;
      }
    `
  ]
})
export class TodoContainerComponent {
  constructor() {
    this.getTodos();
  }

  isLoading = false;
  _todos: ITodo[] = [];
  currentActive = "All";
  completedTodo = 0;
  allTodo = 0;
  isAllCompleted = false;

  set todos(todos: ITodo[]) {
    this.isLoading = true;
    setTimeout(() => {
      this._todos = todos;

      this.completedTodo = this._todos.filter(todo => todo.completed).length;
      this.allTodo = this._todos.length;

      this.isAllCompleted = this._todos.length
        ? this._todos.filter(todo => todo.completed).length ===
          this._todos.length
          ? true
          : false
        : false;

      this.isLoading = false;
    }, 500);
  }

  get todos() {
    // if (this.currentActive === "All") {
    //   return this._todos.filter(todo => todo);
    // } else if (this.currentActive === "Active") {
    //   return this._todos.filter(todo => !todo.completed);
    // } else {
    //   return this._todos.filter(todo => todo.completed);
    // }
    return this._todos;
  }

  setActive(active: navItem) {
    this.currentActive = active;
  }

  generateId() {
    return this._todos.length
      ? Math.max(...this._todos.map(todo => todo.id)) + 1
      : 1;
  }

  addTodo(content: string) {
    const tempTodo: ITodo = {
      id: this.generateId(),
      content,
      completed: false
    };
    this.todos = [tempTodo, ...this._todos];
  }
  getTodos() {
    this.todos = [
      { id: 1, content: "HTML", completed: true },
      { id: 2, content: "CSS", completed: true },
      { id: 3, content: "Javascript", completed: false }
    ];
  }

  toggleAllCheck(completed: boolean) {
    this.isAllCompleted = completed;
    this.todos = this._todos.map(todo => ({ ...todo, completed }));
  }
  clearCompleted() {
    this.todos = this._todos.filter(todo => !todo.completed);
  }
  removeTodo(id: number) {
    this.todos = this._todos.filter(todo => todo.id !== id);
  }
  toggleTodo(id: number) {
    this.todos = this._todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }
}
