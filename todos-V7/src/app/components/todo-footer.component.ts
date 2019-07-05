import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-todo-footer",
  template: `
    <div class="footer">
      <div class="complete-all">
        <input
          class="custom-checkbox"
          type="checkbox"
          id="ck-complete-all"
          (change)="toggleAll($event.target.checked)"
          [checked]="isAllCompleted"
        />
        <label for="ck-complete-all">Mark all as complete</label>
      </div>
      <div class="clear-completed">
        <button class="btn" (click)="clearCompleted()">
          Clear completed (<span class="completed-todos">{{
            completedTodo
          }}</span
          >)
        </button>
        <strong class="active-todos">{{ allTodo }}</strong> items left
      </div>
    </div>
  `,
  styles: [
    `
      .footer {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
      }

      .complete-all,
      .clear-completed {
        position: relative;
        flex-basis: 50%;
      }

      .clear-completed {
        text-align: right;
        padding-right: 15px;
      }

      .btn {
        padding: 1px 5px;
        font-size: 0.8em;
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
export class TodoFooterComponent {
  constructor() {}

  @Input() isAllCompleted: boolean;
  @Input() completedTodo: number;
  @Input() allTodo: number;

  @Output() clearAll = new EventEmitter<void>();
  @Output() toggleAllCheck = new EventEmitter<boolean>();

  clearCompleted() {
    this.clearAll.emit();
  }

  toggleAll(isChecked: boolean) {
    this.toggleAllCheck.emit(isChecked);
  }
}
