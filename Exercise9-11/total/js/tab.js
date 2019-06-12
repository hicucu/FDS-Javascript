class Tab {
  constructor(tabsData) {
    this.tabsData = tabsData;

    // active 클래스가 지정된 tab 요소와 같은 인덱스의 tab-content 요소만 표시
    this.renderTabs();
    this.renderTab();

    // tab 클릭 이벤트 핸들러 등록
    document.querySelector('.tab-group').onclick = (e) => {
      if (e.target.classList.contains('tab')) {
        const target = e.target.textContent.trim();
        this.tabsData = this.tabsData.map(
          tab => ({ ...tab, active: tab.title === target })
        );
      } else if (e.target.classList.contains('icon')) {
        const target = e.target.classList[e.target.classList.length - 1];

        this.tabsData = this.tabsData.map(
          tab => ({ ...tab, active: !!tab.iconClass.includes(target) })
        );
      }
      this.renderTab();
    };
  }

  renderTab() {
    const activeIndex = this.tabsData.findIndex(tab => tab.active === true);

    const $tabGroupChildren = document.querySelector('.tab-group').children;
    const $tabContentGroupChildren = document.querySelector('.tab-content-group').children;

    [...$tabGroupChildren].forEach(t => t.classList.remove('active'));
    $tabGroupChildren[activeIndex].classList.add('active');

    [...$tabContentGroupChildren].forEach((content) => { content.style.display = 'none'; });
    $tabContentGroupChildren[activeIndex].style.display = 'block';
  }

  // tabsData 객체를 기반으로 tab-group 요소를 생성
  renderTabs() {
    const html = `
      <ul class="tab-group">
      ${this.tabsData.map(tab => `<li class="tab${tab.active ? ' active' : ''}">
          <i class="icon ${tab.iconClass}"></i>${tab.title}
        </li>`).join('')}
      </ul>
      <div class="tab-content-group">
      ${this.tabsData.map(tab => `<div class="tab-content">${tab.content}</div>`).join('')}
      </div>`;

    document.querySelector('.tabs').insertAdjacentHTML('beforeend', html);
  }

  // do something!
}
