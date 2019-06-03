(function () {
  class App {
    constructor(t = []) {
      this._todos = t;

      this._navTarget = 'all';

      this.init();

      this.getTodos('GET', 'http://127.0.0.1:9000/todos');
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
      this.$nav = document.querySelector('.nav');

      this.$todos.addEventListener('click', e => this.removeTodo(e.target));

      this.$todos.onchange = (e) => { this.togleTodo(e.target); };

      this.$ckCompleteAll.onclick = (e) => { this.togleCheckboxAll(e.target.checked); };

      const clearCompletedBtn = document.querySelector('.clear-completed > .btn');

      clearCompletedBtn.onclick = () => { this.clearComplete(); };

      this.$nav.onclick = (e) => {
        if (e.target.nodeName === 'UL') return;

        this.setNavTarget(e.target);
      };

      this.$inputTodo.onkeyup = (e) => {
        if (this.$inputTodo.value.trim() === '' || e.keyCode !== 13) return;

        this.addTodo();
      };
    }

    togleTodo(target) {
      const { id } = target.parentNode;
      const completed = target.checked;

      this.getTodos('PATCH', `http://127.0.0.1:9000/todos/${id}`, { id, completed });
    }

    addTodo() {
      const id = this.generateId();
      const content = this.$inputTodo.value;
      const completed = false;

      this.getTodos('POST', 'http://127.0.0.1:9000/todos', { id, content, completed });

      this.$inputTodo.value = '';
    }

    setNavTarget(target) {
      [...this.$nav.children].forEach((c) => { c.classList.remove('active'); });
      target.classList.add('active');
      this.navTarget = target.id;
    }

    clearComplete() {
      this.getTodos('DELETE', 'http://127.0.0.1:9000/todos/completed');
    }

    togleCheckboxAll(completed) {
      this.getTodos('PATCH', 'http://127.0.0.1:9000/todos', { completed });
    }

    setClearCompletedDiv() {
      const completedTodos = document.querySelector('.completed-todos');
      const activeTodos = document.querySelector('.active-todos');
      const { length } = this.todos.filter(todo => (todo.completed));

      completedTodos.innerHTML = length;
      activeTodos.innerHTML = this.todos.length - length;
    }

    setCheckboxAll() {
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

    changeTodosList(displayList) {
      [...this.$todos.children].forEach(c => c.remove());

      const todos = displayList.map((todo) => {
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

      todos.forEach(li => this.$todos.append(li));
    }

    render() {
      const displayList = this.getActiveNavList();
      this.changeTodosList(displayList);
      this.setClearCompletedDiv();
      this.setCheckboxAll();
    }

    removeTodo(target) {
      if (target.classList.contains('remove-todo')) {
        const { id } = target.parentNode;

        this.getTodos('DELETE', `http://127.0.0.1:9000/todos/${id}`);
      }
    }

    generateId() {
      return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
    }

    getTodos(method, uri, payload) {
      const headers = { 'Content-Type': 'application/json' };
      const body = JSON.stringify(payload);

      fetch(uri, { method, headers, body }).then(res => res.json())
        .then((res) => { this.todos = res; })
        .catch(console.error);
    }
  }

  window.onload = function () {
    const app = new App();
  };
}());
