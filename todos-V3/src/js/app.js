(function () {
  const SERVER = '';
  const TODOS = `${SERVER}/todos`;
  const TODO = id => `${SERVER}/todos/${id}`;
  const COMPLETE = `${SERVER}/todos/completed`;

  class App {
    constructor(t = []) {
      this._todos = t;

      this._navTarget = 'all';

      this.init();

      this.getTodos('GET', TODOS);

      this.isLoading = false;
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

      this.$todos.onchange = e => { this.togleTodo(e.target); };

      this.$ckCompleteAll.onclick = e => { this.togleCheckboxAll(e.target.checked); };

      const clearCompletedBtn = document.querySelector('.clear-completed > .btn');

      clearCompletedBtn.onclick = () => { this.clearComplete(); };

      this.$nav.onclick = e => {
        if (e.target.nodeName === 'UL') return;

        this.setNavTarget(e.target);
      };

      this.$inputTodo.onkeyup = e => {
        if (this.$inputTodo.value.trim() === '' || e.keyCode !== 13) return;

        this.addTodo();
      };
    }

    togleTodo(target) {
      const { id } = target.parentNode;
      const completed = target.checked;
      this.getTodos('PATCH', TODO(id), { id, completed });
    }

    addTodo() {
      const id = this.generateId();
      const content = this.$inputTodo.value;
      const completed = false;

      this.getTodos('POST', TODOS, { id, content, completed });

      this.$inputTodo.value = '';
    }

    setNavTarget(target) {
      [...this.$nav.children].forEach(c => { c.classList.remove('active'); });
      target.classList.add('active');
      this.navTarget = target.id;
    }

    clearComplete() {
      this.getTodos('DELETE', COMPLETE);
    }

    togleCheckboxAll(completed) {
      this.getTodos('PATCH', TODOS, { completed });
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

      const todos = displayList.map(todo => {
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
      this.togleLoading(false);
    }

    removeTodo(target) {
      if (target.classList.contains('remove-todo')) {
        const { id } = target.parentNode;

        this.getTodos('DELETE', TODO(id));
      }
    }

    generateId() {
      return this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
    }

    togleLoading(isOn) {
      if (!isOn) {
      // 스피너 끄기
        const loading = document.querySelector('.loading');
        if (loading) loading.remove();

        this.isLoading = !this.isLoading;
      } else {
      // 스피너 켜기
        const loading = document.createElement('div');
        loading.classList.add('loading');

        const $body = document.querySelector('body');
        const $loading = document.querySelector('.loading');
        if (!$loading) { $body.append(loading); }

        this.isLoading = !this.isLoading;
      }
    }

    getTodos(method, uri, payload) {
      this.togleLoading(true);
      const headers = { 'Content-Type': 'application/json' };
      const body = JSON.stringify(payload);

      fetch(uri, { method, headers, body }).then(res => res.json())
        .then(res => { this.todos = res; })
        .catch(() => {
          this.togleLoading(false);
          this.render();
          console.error();
        });
    }
  }

  window.onload = function () {
    const app = new App();
  };
}());
