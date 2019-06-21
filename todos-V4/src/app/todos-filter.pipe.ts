import { Pipe, PipeTransform } from '@angular/core';

import { ITodo } from './itodo';
import { navItem } from './nav-item.type';

@Pipe({
  name: 'todosFilter',
  pure: false
})
export class TodosFilterPipe implements PipeTransform {
  transform(todos: ITodo[], navState: navItem): ITodo[] {
    if (navState === 'All') {
      return todos;
    } else if (navState === 'Active') {
      return todos.filter(todo => !todo.completed);
    } else {
      return todos.filter(todo => todo.completed);
    }
  }
}
