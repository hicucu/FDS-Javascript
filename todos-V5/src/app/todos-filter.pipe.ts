import { Pipe, PipeTransform } from "@angular/core";
import { ITodo } from "./itodo";
import { navItem } from "./nav-item.type";

@Pipe({
  name: "todosFilter"
})
export class TodosFilterPipe implements PipeTransform {
  transform(todos: ITodo[], active: navItem): any {
    if (active === "All") {
      return todos.filter(todo => todo);
    } else if (active === "Active") {
      return todos.filter(todo => !todo.completed);
    } else {
      return todos.filter(todo => todo.completed);
    }
  }
}
