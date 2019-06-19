import { Component } from '@angular/core';
import {ITodo} from '../itodo';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-todos',
  template: `
  <div class="container">
  <h1 class="title">Todos</h1>
  <div class="ver">4.0</div>

  <input class="input-todo" placeholder="What needs to be done?"
  (keyup.enter)="addTodo($event.target)"
  autofocus>
  <ul class="nav" (click)="setActive($event.target.id)">
    <li id="all" [class.active]="isActive('all')">All</li>
    <li id="active" [class.active]="isActive('active')">Active</li>
    <li id="completed" [class.active]="isActive('completed')">Completed</li>
  </ul>

  <ul class="todos">
    <li id="{{todo.id}}}" class="todo-item" *ngFor="let todo of displayTodos">
      <input class="custom-checkbox" type="checkbox" id="ck-{{todo.id}}}"
      [checked]="todo.completed"
      (click)="toggleTodo(todo.id)"
      >
      <label for="ck-{{todo.id}}}">{{todo.content}}</label>
      <i class="remove-todo far fa-times-circle"
      (click)="removeTodo(todo.id)"
      ></i>
    </li>
  </ul>
  <div class="footer">
    <div class="complete-all">
      <input class="custom-checkbox" type="checkbox" id="ck-complete-all"
      (change)="toggleAll($event.target.checked)"
      [checked]="isAllCompleted"
      >
      <label for="ck-complete-all">Mark all as complete</label>
    </div>
    <div class="clear-completed">
      <button class="btn"
      (click)="clearCompleted()">Clear completed (<span class="completed-todos">{{completedTodo}}</span>)</button>
      <strong class="active-todos">{{allTodo}}</strong> items left
    </div>
  </div>
</div>
<pre>{{todos | json}}</pre>
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

    /* .input-todo  */
    .input-todo {
      display: block;
      width: 100%;
      height: 45px;
      padding: 10px 16px;
      font-size: 18px;
      line-height: 1.3333333;
      color: #555;
      border: 1px solid #ccc;
      border-color: #e7ecee;
      border-radius: 6px;
      outline: none;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }

    .input-todo:focus {
      border-color: #23b7e5;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
    }

    .input-todo::-webkit-input-placeholder {
      color: #999;
    }

    /* .nav */
    .nav {
      display: flex;
      margin: 15px;
      list-style: none;
    }

    .nav > li {
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
    }

    .nav > li.active {
      color: #fff;
      background-color: #23b7e5;
    }

    .todos {
      margin-top: 20px;
    }

    /* .todo-item */
    .todo-item {
      position: relative;
      /* display: block; */
      height: 50px;
      padding: 10px 15px;
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-color: #e7ecee;
      list-style: none;
    }

    .todo-item:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .todo-item:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    /*
      .custom-checkbox
      custom-checkbox 바로 뒤에 위치한 label의 before와 after를 사용해
      custom-checkbox의 외부 박스와 내부 박스를 생성한다.

      <input class="custom-checkbox" type="checkbox" id="myId">
      <label for="myId">Content</label>
    */

    .custom-checkbox {
      display: none;
    }

    .custom-checkbox + label {
      position: absolute; /* 부모 위치를 기준으로 */
      top: 50%;
      left: 15px;
      transform: translate3d(0, -50%, 0);
      display: inline-block;
      width: 90%;
      line-height: 2em;
      padding-left: 35px;
      cursor: pointer;
      user-select: none;
    }

    .custom-checkbox + label:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate3d(0, -50%, 0);
      width: 20px;
      height: 20px;
      background-color: #fff;
      border: 1px solid #cfdadd;
    }

    .custom-checkbox:checked + label:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 6px;
      transform: translate3d(0, -50%, 0);
      width: 10px;
      height: 10px;
      background-color: #23b7e5;
    }

    /* .remove-todo button */
    .remove-todo {
      display: none;
      position: absolute;
      top: 50%;
      right: 10px;
      cursor: pointer;
      transform: translate3d(0, -50%, 0);
    }

    /* todo-item이 호버 상태이면 삭제 버튼을 활성화 */
    .todo-item:hover > .remove-todo {
      display: block;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
    }

    .complete-all, .clear-completed {
      position: relative;
      flex-basis: 50%;
    }

    .clear-completed {
      text-align: right;
      padding-right: 15px;
    }

    .btn {
      padding: 1px 5px;
      font-size: .8em;
      line-height: 1.5;
      border-radius: 3px;
      outline: none;
      color: #333;
      background-color: #fff;
      border-color: #ccc;
      cursor: pointer;
    }

    .btn:hover {
      color: #333;
      background-color: #e6e6e6;
      border-color: #adadad;
    }

    `
  ]
})
export class TodosComponent {
  private _todos: ITodo[] = [
    { id: 1, content: 'HTML', completed: true },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];

  private _displayTodos: ITodo[] = [];
  private _currentActive = 'all';

  completedTodo = 0;
  allTodo = 0;
  isAllCompleted = false;

  constructor() {
    this.todos = this._todos;
  }

  get displayTodos() {
    return this._displayTodos;
  }


  set todos(todos: ITodo[]) {
    this._todos = todos;

    this.completedTodo = this._todos.filter( todo => todo.completed).length;
    this.allTodo = this._todos.length;

    this.isAllCompleted = this._todos.length ?
    this._todos.filter(todo => todo.completed).length === this._todos.length ? true : false : false;

    this.setDisplayTodos(this.currentActive);
  }

  get todos() {
    return this._todos;
  }

  set currentActive(id: string) {
    this.currentActive = id;
    this.setDisplayTodos(this.currentActive);
  }

  get currentActive() {
    return this.currentActive;
  }

  setActive(id: string) {
      this.currentActive = id;
  }
  isActive(id: string) {
      return this.currentActive === id;
  }

  setDisplayTodos(id: string) {
    this._displayTodos = [];

    if (id === 'all') {
    Object.assign(this.displayTodos, this.todos);
    } else if (id === 'active') {
    Object.assign(this.displayTodos, this.todos.filter(todo => !todo.completed));
    } else {
      Object.assign(this.displayTodos, this.todos.filter(todo => todo.completed));
    }
  }

  toggleAll(completed: boolean) {
    this.isAllCompleted = completed;
    this.todos = this.todos.map(todo => ({ ...todo, completed }));
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  removeTodo(id: number ) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(id: number ) {
    this.todos = this.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
  }

  generateId() {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo(target: HTMLInputElement ) {
    const tempTodo = {id: this.generateId(), content: target.value, completed: false};
    this.todos = [tempTodo, ...this.todos];
    target.value = '';
  }
}
