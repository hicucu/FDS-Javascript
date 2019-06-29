import { Component, Input, Output, EventEmitter } from "@angular/core";
import { iTodo } from "../types/itodo";
import { tNavItem } from "../types/nav-item.type";

@Component({
  selector: "app-todo-list",
  template: `
    <ul class="todos">
      <li
        class="todo-item"
        *ngFor="let todo of todos | todosFilter: currentActive"
      >
        <input
          class="custom-checkbox"
          type="checkbox"
          id="ck-{{ todo.id }}"
          [checked]="todo.completed"
          (click)="toggleTodo(todo)"
        />
        <label for="ck-{{ todo.id }}">{{ todo.content }}</label>
        <i
          class="remove-todo far fa-times-circle"
          (click)="removeTodo(todo.id)"
        >
        </i>
      </li>
    </ul>
  `,
  styles: [
    `
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
    `
  ]
})
export class TodoListComponent {
  constructor() { }
  @Input() todos: iTodo[];
  @Input() currentActive: tNavItem;
  @Output() toggle = new EventEmitter<iTodo>();
  @Output() remove = new EventEmitter<number>();

  toggleTodo(todo: iTodo) {
    this.toggle.emit(todo);
  }
  removeTodo(id: number) {
    this.remove.emit(id);
  }
}
