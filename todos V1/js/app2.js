let todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];
const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $ckCompleteAll = document.querySelector('#ck-complete-all');
const $btn = document.querySelector('.btn');

function clearCompleted() {
  const $completedTodos = document.querySelector('.completed-todos');
  const $activeTodos = document.querySelector('.active-todos');
  const { length } = todos.filter(todo => (todo.completed));
  $completedTodos.innerHTML = length;
  $activeTodos.innerHTML = todos.length - length;
}


function render() {
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
  clearCompleted();
}

function removeTodo(e) {
  if (e.target.classList.contains('remove-todo')) {
    todos = todos.filter(todo => todo.id !== +e.target.parentNode.id);

    render();
  }
}
function generateId() {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}
$todos.addEventListener('click', e => removeTodo(e));

$inputTodo.onkeyup = function (e) {
  if ($inputTodo.value.trim() === '' || e.keyCode !== 13) return;
  todos = [{ id: generateId(), content: $inputTodo.value, completed: false }, ...todos];
  render();
};

$todos.onchange = function (e) {
  todos = todos.map(
    todo => Object.assign(todo, todo.id === +e.target.parentNode.id
      ? { completed: !todo.completed }
      : {})
  );
  render();
};
$ckCompleteAll.onclick = function (e) {
  todos = todos.map(
    todo => Object.assign(todo, e.target.checked ? { completed: true } : { completed: false })
  );
  render();
};
$btn.onclick = function (e) {
  todos = todos.filter(todo => !todo.completed);
  render();
};

render();
