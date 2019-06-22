import { Component, Input, Output, EventEmitter } from "@angular/core";
import { navItem } from "../nav-item.type";

@Component({
  selector: "app-todo-nav",
  template: `
    <ul class="nav">
      <li
        *ngFor="let navItem of navItems"
        [class.active]="currentActive === navItem"
        (click)="setActive(navItem)"
      >
        {{ navItem }}
      </li>
    </ul>
  `,
  styles: [
    `
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
    `
  ]
})
export class TodoNavComponent {
  constructor() {}

  @Input() currentActive: navItem;
  @Output() changeActive = new EventEmitter();

  navItems: navItem[] = ["All", "Active", "Completed"];

  setActive(active: navItem) {
    this.currentActive = active;
    this.changeActive.emit(active);
  }
}
