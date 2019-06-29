import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http"

import { iTodo } from "../types/itodo";
import { tNavItem } from "../types/nav-item.type";

@Component({
  selector: "app-todo-container",
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">6.0</div>
      <app-todo-form (add)="addTodo($event)"> </app-todo-form>
      <app-todo-nav
        [currentNavItem]="navItem"
        (changeNavItem)="setNavItem($event)"
      >
      </app-todo-nav>
      <app-todo-list
        [currentActive]="navItem"
        [todos]="todos"
        (remove)="removeTodo($event)"
        (toggle)="toggleTodo($event)"
      ></app-todo-list>
      <div [class.loading]="isLoading"></div>
      <app-todo-footer
        (toggleAllCheck)="toggleAllCheck($event)"
        (clearAll)="clearCompleted($event)"
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
export class TodoContainerComponent implements OnInit {
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.getTodos();
  }

  isLoading = false;
  _todos: iTodo[] = [];
  navItem = "All";
  completedTodo = 0;
  allTodo = 0;
  isAllCompleted = false;

  set todos(todos: iTodo[]) {
    this.isLoading = true;
    this._todos = todos;

    this.completedTodo = this._todos.filter(todo => todo.completed).length;
    this.allTodo = this._todos.length - this.completedTodo;

    this.isAllCompleted = this._todos.length
      ? this._todos.filter(todo => todo.completed).length ===
        this._todos.length
        ? true
        : false
      : false;

    this.isLoading = false;
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

  setNavItem(navItem: tNavItem) {
    this.navItem = navItem;
  }

  generateId() {
    return this._todos.length
      ? Math.max(...this._todos.map(todo => todo.id)) + 1
      : 1;
  }

  addTodo(content: string) {
    this.isLoading = true;
    const tempTodo: iTodo = {
      id: this.generateId(),
      content,
      completed: false
    };
    // this.todos = [tempTodo, ...this._todos];
    this.http.post<iTodo[]>('http://localhost:4500/todos', tempTodo).subscribe(todos => this.todos = todos);
  }
  getTodos() {
    this.isLoading = true;
    this.isLoading = true;
    this.http.get<iTodo[]>('http://localhost:4500/todos').subscribe(todos => this.todos = todos);
  }

  toggleAllCheck(completed: boolean) {
    this.isLoading = true;
    this.isAllCompleted = completed;
    console.log({ "completed": completed });
    this.http.patch<iTodo[]>(
      'http://localhost:4500/todos', { "completed": completed }
    ).subscribe(todos => this.todos = todos);
  }
  clearCompleted() {
    this.isLoading = true;
    // this.todos = this._todos.filter(todo => !todo.completed);
    this.todos.forEach(todo => {
      if (todo.completed)
        this.removeTodo(todo.id);
    })
  }
  removeTodo(id: number) {
    this.isLoading = true;
    this.http.delete<iTodo[]>(`http://localhost:4500/todos/${id}`).subscribe(todos => this.todos = todos);
    // this.todos = this._todos.filter(todo => todo.id !== id);
  }
  toggleTodo(todo: iTodo) {
    this.isLoading = true;
    this.http.patch<iTodo[]>(
      `http://localhost:4500/todos/${todo.id}`,
      { "completed": !todo.completed }
    ).subscribe(todos => this.todos = todos);
  }
}
