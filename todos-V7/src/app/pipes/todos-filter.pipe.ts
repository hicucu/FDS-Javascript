import { Pipe, PipeTransform } from "@angular/core";
import { iTodo } from "../interfaces/todo.interface";
import { tNavItem } from "../types/nav-item.type";

@Pipe({
  name: "todosFilter"
})
export class TodosFilterPipe implements PipeTransform {
  transform(todos: iTodo[], navItem: tNavItem): any {
    if (navItem === "All") {
      return todos.filter(todo => todo);
    } else if (navItem === "Active") {
      return todos.filter(todo => !todo.completed);
    } else {
      return todos.filter(todo => todo.completed);
    }
  }
}
