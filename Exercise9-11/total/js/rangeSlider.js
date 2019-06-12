(function () {
  const $range = document.querySelector('.range');
  const $track = document.querySelector('.range-track');
  const $fill = document.querySelector('.range-track.fill');
  const $handle = document.querySelector('.range-handle');
  const $gradient = document.querySelector('.gradient');
  const $gradientAngle = document.querySelector('.gradient-angle');

  // .range-track 요소의 정보
  const { left, right, width } = $track.getBoundingClientRect();

  /**
     * mousedown, mousemove 이벤트 핸들러
     * 1. 뷰포트를 기준으로 한 마우스 포인터의 x축 위치를 바탕으로 .range-handle 요소를 수평 이동하고 .fill 요소의 너비를 변경한다.
     * 2. .gradient 요소의 background-image를 변경한다.
     *
     * @param {MouseEvent} e - 이벤트 객체
     */
  function rangeHandler(e) {
  // do something!
    $handle.style.opacity = 0.7;

    if (e.clientX >= left && e.clientX <= right) {
      $handle.style.transform = `translate3d(${e.clientX - left}px, 0, 0)`;
      $fill.style.width = `${e.clientX - left}px`;

      const deg = parseInt((360 / width) * (e.clientX - left), 10);
      $gradientAngle.innerHTML = deg;
      $gradient.style.backgroundImage = `linear-gradient(${deg}deg, #f1a829, #f14429)`;
    }
  }

  // .range-track 요소의 좌우 영역 내에서 발생한 이벤트만 캐치하기 위해 .range 요소에 이벤트를 등록한다.
  // margin 영역은 이벤트를 발생시키지 않는다.
  $range.addEventListener('mousedown', (e) => {
    e.preventDefault();
    rangeHandler(e);

    // mousedown 이벤트가 발생한 상태에서 mousemove 이벤트가 발생
    $range.addEventListener('mousemove', rangeHandler);
  });

  // mouseup 이벤트가 발생하면 mousemove 이벤트를 삭제한다.
  // $range 밖에서 발생한 mouseup 이벤트도 처리하기 위해 document의 mouseup 이벤트에 이벤트 핸들러를 등록한다
  document.addEventListener('mouseup', () => {
    $range.removeEventListener('mousemove', rangeHandler);
  });
}());
