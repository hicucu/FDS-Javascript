import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http"

import { iTodo } from "../interfaces/todo.interface";
import { tNavItem } from "../types/nav-item.type";
import { TodoService } from '../services/todo.service';

@Component({
  selector: "app-todo-container",
  template: `
    <div class="container">
      <h1 class="title">Todos</h1>
      <div class="ver">7.0</div>
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
  constructor(private _service$: TodoService) {

  }
  ngOnInit() {
    this.getTodos();
  }

  _todos: iTodo[] = [];
  navItem = "All";
  completedTodo = 0;
  allTodo = 0;
  isAllCompleted = false;
  isLoading = false;

  set todos(todos: iTodo[]) {

    this._todos = todos;

    this.completedTodo = this._todos.filter(todo => todo.completed).length;
    this.allTodo = this._todos.length - this.completedTodo;

    this.isAllCompleted = this._todos.length
      ? this._todos.filter(todo => todo.completed).length ===
        this._todos.length
        ? true
        : false
      : false;
    this.setIsLoading(false);

  }

  get todos() {
    return this._todos;
  }

  get service$() {
    this.setIsLoading(true);
    return this._service$;
  }

  setIsLoading(isLoading: boolean) {
    this._service$.setLoading(isLoading);
    this.isLoading = this._service$.isLoading;
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
    const tempTodo: iTodo = {
      id: this.generateId(),
      content,
      completed: false
    };

    this.service$.add(tempTodo).subscribe(todos => this.todos = todos);
  }
  getTodos() {
    this.service$.getAll().subscribe(todos => this.todos = todos);
  }

  toggleAllCheck(completed: boolean) {
    this.isAllCompleted = completed;
    console.log({ "completed": completed });
    this.service$.toggleAll(completed).subscribe(todos => this.todos = todos);
  }
  clearCompleted() {
    this.todos.forEach(todo => {
      if (todo.completed)
        this.removeTodo(todo.id);
    })
  }
  removeTodo(id: number) {
    this.service$.remove(id).subscribe(todos => this.todos = todos);

  }
  toggleTodo(todo: iTodo) {
    this.service$.toggle(todo).subscribe(todos => this.todos = todos);
  }
}
