class App {
  constructor(t = []) {
    this._todos = t;

    this._navTarget = 'all';

    this.init();

    this.getTodos();
  }

  get todos() {
    return this._todos;
  }

  set todos(todos) {
    this._todos = todos;
    this.render();
  }

  get navTarget() {
    return this._navTarget;
  }

  set navTarget(navTarget) {
    this._navTarget = navTarget;
    this.render();
  }

  init() {
    this.$inputTodo = document.querySelector('.input-todo');
    this.$todos = document.querySelector('.todos');
    this.$ckCompleteAll = document.querySelector('#ck-complete-all');
    this.$clearCompletedBtn = document.querySelector('.clear-completed > .btn');
    this.$nav = document.querySelector('.nav');

    this.$nav.onclick = (e) => {
      if (e.target.nodeName === 'UL') return;
      this.setNavTarget(e.target);
    };

    this.$todos.addEventListener('click', e => this.removeTodo(e));

    this.$inputTodo.onkeyup = (e) => {
      if (this.$inputTodo.value.trim() === '' || e.keyCode !== 13) return;
      this.addTodo();
    };

    this.$todos.onchange = (e) => {
      this.todos = this.todos.map(
        todo => Object.assign(todo, todo.id === +e.target.parentNode.id
          ? { completed: !todo.completed }
          : {})
      );
    };

    this.$ckCompleteAll.onclick = (e) => {
      this.togleCheckboxAll(e.target.checked);
    };

    this.$clearCompletedBtn.onclick = () => {
      this.clearComplete();
    };
  }

  addTodo() {
    this.todos = [
      { id: this.generateId(), content: this.$inputTodo.value, completed: false },
      ...this.todos];

    this.$inputTodo.value = '';
  }

  setNavTarget(target) {
    [...this.$nav.children].forEach((c) => { c.classList.remove('active'); });
    target.classList.add('active');
    this.navTarget = target.id;
  }

  clearComplete() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  togleCheckboxAll(completed) {
    this.todos = this.todos.map(
      todo => ({ ...todo, completed })
    );
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

    this.$ckCompleteAll.checked = notCompletedCount !== this.todos.length
    && !(notCompletedCount > 0);
  }

  getActiveNavList() {
    const activeList = [];

    switch (this.navTarget) {
      case 'all':
        Object.assign(activeList, this.todos);
        break;
      case 'active':
        Object.assign(activeList, this.todos.filter(todo => !todo.completed));
        break;
      default:
        Object.assign(activeList, this.todos.filter(todo => todo.completed));
    }

    return activeList;
  }

  changeTodoList4HTML(todoList) {
    [...this.$todos.children].forEach(c => c.remove());

    const lis = todoList.map((todo) => {
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
    lis.forEach(li => this.$todos.append(li));
  }

  render() {
    const todoList = this.getActiveNavList();
    this.changeTodoList4HTML(todoList);
    this.setClearCompleted();
    this.setCompletedAll();
  }

  removeTodo(e) {
    if (e.target.classList.contains('remove-todo')) {
      this.todos = this.todos.filter(todo => todo.id !== +e.target.parentNode.id);
    }
  }

  generateId() {
    return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
  }

  getTodos() {
    this.todos = [{ id: 1, content: 'HTML', completed: true },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }];
  }
}

window.onload = function () {
  const app = new App();
};
