import { Component, Input, Output, EventEmitter } from "@angular/core";
import { tNavItem } from "../types/nav-item.type";

@Component({
  selector: "app-todo-nav",
  template: `
    <ul class="nav">
      <li
        *ngFor="let navItem of navItems"
        [class.active]="currentNavItem === navItem"
        (click)="setNavItem(navItem)"
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

  @Input() currentNavItem: tNavItem;
  @Output() changeNavItem = new EventEmitter<tNavItem>();

  navItems: tNavItem[] = ["All", "Active", "Completed"];

  setNavItem(navItem: tNavItem) {
    this.currentNavItem = navItem;
    this.changeNavItem.emit(navItem);
  }
}
