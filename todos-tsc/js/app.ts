interface ITodo {
  id:number,
  content:string,
  completed:boolean
}
class App {  
  private _navTarget:string = 'all';
  
  private $inputTodo:HTMLInputElement = document.querySelector('.input-todo');
  private $todos:HTMLUListElement = document.querySelector('.todos');
  private $ckCompleteAll:HTMLInputElement = document.querySelector('#ck-complete-all');
  private $clearCompletedBtn:HTMLButtonElement = document.querySelector('.clear-completed > .btn');
  private $nav:HTMLUListElement = document.querySelector('.nav');

  constructor(private _todos:ITodo[] = []) {
    this.init();

    this.getTodos();
  }

  get todos() {
    return this._todos;
  }

  set todos(todos:ITodo[]) {
    this._todos = todos;
    this.render();
  }

  get navTarget() {
    return this._navTarget;
  }

  set navTarget(navTarget:string) {
    this._navTarget = navTarget;
    this.render();
  }

  init() {

    this.$nav.onclick = (e:MouseEvent) => {
      const target = <HTMLLIElement>e.target;
      if (target.nodeName === 'UL') return;
      this.setNavTarget(target);
    };

    this.$todos.addEventListener('click', (e:MouseEvent) => this.removeTodo(e));

    this.$inputTodo.onkeyup = (e:KeyboardEvent) => {
      if (this.$inputTodo.value.trim() === '' || e.keyCode !== 13) return;
      this.addTodo();
    };

    this.$todos.onchange = (e:Event) => {
      let target = <HTMLInputElement>e.target;
      let parentNode = <HTMLLIElement>target.parentNode;
      this.todos = this.todos.map(
        todo => Object.assign(todo, todo.id === parseInt(parentNode.id)
          ? { completed: !todo.completed }
          : {})
      );
    };

    this.$ckCompleteAll.onclick = (e:MouseEvent) => {
      this.togleCheckboxAll((<HTMLInputElement>e.target).checked);
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

  setNavTarget(target:HTMLLIElement) {
    [...this.$nav.children].forEach((c) => { c.classList.remove('active'); });
    target.classList.add('active');
    this.navTarget = target.id;
  }

  clearComplete() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  togleCheckboxAll(completed:boolean) {
    this.todos = this.todos.map(
      todo => ({ ...todo, completed })
    );
  }

  setClearCompleted() {
    const $completedTodos:HTMLSpanElement = document.querySelector('.completed-todos');
    const $activeTodos:HTMLSpanElement = document.querySelector('.active-todos');
    const { length:number } = this.todos.filter(todo => (todo.completed));
    $completedTodos.innerHTML = length.toString();
    $activeTodos.innerHTML = (this.todos.length - length).toString();
  }

  setCompletedAll() {
    const notCompletedCount:number = this.todos.filter(todo => !todo.completed).length;

    this.$ckCompleteAll.checked = notCompletedCount !== this.todos.length
    && !(notCompletedCount > 0);
  }

  getActiveNavList() {
    const activeList:ITodo[] = [];

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

    const lis:HTMLLIElement[] = todoList.map((todo:ITodo) => {
      const li = document.createElement('li');

      li.id = todo.id.toString();
      li.classList.add('todo-item');

      const checkBox = document.createElement('input');
      checkBox.classList.add('custom-checkbox');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.id = `ck-${li.id}`;

      if (todo.completed) {
        checkBox.setAttribute('checked', true.toString());
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
    const todoList:ITodo[] = this.getActiveNavList();
    this.changeTodoList4HTML(todoList);
    this.setClearCompleted();
    this.setCompletedAll();
  }

  removeTodo(e:MouseEvent) {    
    const target = <HTMLSpanElement>e.target;   
    const parentNode = <HTMLLIElement>target.parentNode;
    if ((target).classList.contains('remove-todo')) {
      this.todos = this.todos.filter(todo => todo.id !== +parentNode.id);
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
