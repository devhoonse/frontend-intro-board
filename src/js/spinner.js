
import spinner from '../image/spinner.gif'

/**
 * 전달받은 parent 요소 아래에 위치한 .spinner-area 영역에 로딩 이미지를 표시합니다.
 * @param {Element} parent  .spinner-area 영역을 표시해야 하는 요소
 */
export function createSpinner(parent) {
  const spinnerAreaEl = parent.querySelector('.spinner-area');

  const imageEl = document.createElement('img');
  imageEl.alt = 'spinner';
  imageEl.src = spinner;

  spinnerAreaEl.append(imageEl);
}


/**
 * 전달받은 parent 요소 아래에 위치한 .spinner-area 영역을 보이지 않게 합니다.
 * @param {Element} parent  .spinner-area 영역을 보이지 않게 해야 하는 요소
 */
export function hideSpinner(parent) {
  const spinnerAreaEl = parent.querySelector('.spinner-area');

  spinnerAreaEl.style.display = 'none';
}
