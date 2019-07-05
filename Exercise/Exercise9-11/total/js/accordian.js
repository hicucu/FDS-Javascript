class Accordion {
  constructor(options) {
    // 기본 옵션과 사용자 지정 옵션을 병합
    this.config = Accordion.mergeConfig(options);
    this.$accordion = document.querySelector(this.config.selector);
    this.$submenu = document.querySelectorAll('.accordion li .submenu');
    this.$submenu.forEach((menu) => { menu.style.height = menu.parentNode.classList.contains('active') ? `${menu.scrollHeight}px` : ''; });
    this.selector = this.config.selector;
    // do something!
    document.querySelector(this.selector).onclick = (e) => { this.selectClick(e); };
  }

  selectClick(e) {
    let target = '';


    if (e.target.classList.contains('menu')) {
      target = e.target.parentNode;
    } else if (e.target.classList.contains('fa')) {
      target = e.target.parentNode.parentNode;
    } else return;

    if (!this.config.multi) {
      document.querySelectorAll(`${this.selector} > li`).forEach(li => li.classList.remove('active'));
      target.classList.add('active');
    } else target.classList.toggle('active');

    this.$submenu.forEach((menu) => { menu.style.height = menu.parentNode.classList.contains('active') ? `${menu.scrollHeight}px` : ''; });
  }

  static mergeConfig(options) {
    // 기본 옵션
    const config = {
      selector: '#accordion',
      multi: true
    };

    return { ...config, ...options };
  }

  // do something!
}
