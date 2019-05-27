
const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $ckCompleteAll = document.querySelector('#ck-complete-all');
const $btn = document.querySelector('.btn');

class App {
  constructor(t = []) {
    this.todos = t;
    this.init();
  }

  init() {
    $todos.addEventListener('click', e => this.removeTodo(e));

    $inputTodo.onkeyup = (e) => {
      if ($inputTodo.value.trim() === '' || e.keyCode !== 13) return;
      this.todos = [
        { id: this.generateId(), content: $inputTodo.value, completed: false },
        ...this.todos];
      $inputTodo.value = '';
      this.render();
    };

    $todos.onchange = (e) => {
      this.todos = this.todos.map(
        todo => Object.assign(todo, todo.id === +e.target.parentNode.id
          ? { completed: !todo.completed }
          : {})
      );
      this.render();
    };
    $ckCompleteAll.onclick = (e) => {
      this.todos = this.todos.map(
        todo => Object.assign(todo, e.target.checked ? { completed: true } : { completed: false })
      );
      this.render();
    };
    $btn.onclick = () => {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.render();
    };
  }

  setClearCompleted() {
    const $completedTodos = document.querySelector('.completed-todos');
    const $activeTodos = document.querySelector('.active-todos');
    const { length } = this.todos.filter(todo => (todo.completed));
    $completedTodos.innerHTML = length;
    $activeTodos.innerHTML = this.todos.length - length;
  }

  setCompletedAll() {
    const notCompletedCount = this.todos.filter(todo => !todo.completed).length;
    $ckCompleteAll.checked = notCompletedCount !== this.todos.length && !(notCompletedCount > 0);
  }

  render() {
    while ($todos.hasChildNodes()) {
      $todos.removeChild($todos.firstChild);
    }
    const lis = this.todos.map((todo) => {
      const li = document.createElement('li');
      li.id = todo.id;
      li.classList.add('todo-item');

      const checkBox = document.createElement('input');
      checkBox.classList.add('custom-checkbox');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.id = `ck-${li.id}`;

      if (todo.completed) {
        checkBox.setAttribute('checked', true);
      }

      const label = document.createElement('label');
      label.setAttribute('for', `ck-${li.id}`);
      label.append(todo.content);

      const img = document.createElement('i');
      img.classList.add('remove-todo');
      img.classList.add('far');
      img.classList.add('fa-times-circle');

      li.append(checkBox);
      li.append(label);
      li.append(img);
      return li;
    });
    lis.forEach(li => $todos.append(li));

    this.setClearCompleted();
    this.setCompletedAll();
  }

  removeTodo(e) {
    if (e.target.classList.contains('remove-todo')) {
      this.todos = this.todos.filter(todo => todo.id !== +e.target.parentNode.id);

      this.render();
    }
  }

  generateId() {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }
}
const app = new App([
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
]);

app.render();
