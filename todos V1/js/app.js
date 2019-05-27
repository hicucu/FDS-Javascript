let todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];
const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $ckCompleteAll = document.querySelector('#ck-complete-all');
const $btn = document.querySelector('.btn');

class App {
  constructor() {
    this.clearCompleted = this.clearCompleted.bind(this);
    this.render = this.render.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.generateId = this.generateId.bind(this);
  }

  clearCompleted() {
    const $completedTodos = document.querySelector('.completed-todos');
    const $activeTodos = document.querySelector('.active-todos');
    const { length } = todos.filter(todo => (todo.completed));
    $completedTodos.innerHTML = length;
    $activeTodos.innerHTML = todos.length - length;
  }


  render() {
    while ($todos.hasChildNodes()) {
      $todos.removeChild($todos.firstChild);
    }
    const lis = todos.map((todo) => {
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

      // <i class="remove-todo far fa-times-circle"></i>
      const img = document.createElement('i');
      img.classList.add('remove-todo');
      img.classList.add('far');
      img.classList.add('fa-times-circle');

      // const button = document.createElement('button');
      // button.classList.add('remove');
      // button.append('X');

      li.append(checkBox);
      li.append(label);
      // li.append(button);
      li.append(img);
      return li;
    });
    lis.forEach(li => $todos.append(li));
    this.clearCompleted();
  }

  removeTodo(e) {
    if (e.target.classList.contains('remove-todo')) {
      todos = todos.filter(todo => todo.id !== +e.target.parentNode.id);

      this.render();
    }
  }

  generateId() {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }
}
const app = new App();

$todos.addEventListener('click', e => app.removeTodo(e));

$inputTodo.onkeyup = function (e) {
  if ($inputTodo.value.trim() === '' || e.keyCode !== 13) return;
  todos = [{ id: app.generateId(), content: $inputTodo.value, completed: false }, ...todos];
  $inputTodo.value = '';
  app.render();
};

$todos.onchange = function (e) {
  todos = todos.map(
    todo => Object.assign(todo, todo.id === +e.target.parentNode.id
      ? { completed: !todo.completed }
      : {})
  );
  app.render();
};
$ckCompleteAll.onclick = function (e) {
  todos = todos.map(
    todo => Object.assign(todo, e.target.checked ? { completed: true } : { completed: false })
  );
  app.render();
};
$btn.onclick = function () {
  todos = todos.filter(todo => !todo.completed);
  app.render();
};
app.render();
