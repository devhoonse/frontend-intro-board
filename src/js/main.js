import { fetch } from "whatwg-fetch";   // 브라우저 명세인 fetch 함수에 대한 polyfill 주입
import { createSpinner, hideSpinner } from "./spinner.js";
import "../scss/index.scss";
// import '../css/main.css';

/**
 * DOMContentLoaded
 * - 브라우저가 HTML 을 모두 파싱하여 DOM 트리를 완성한 즉시 발생하는 이벤트입니다.
 * - 이미지, css 와 같은 리소스들이 모두 로딩된 상태는 아니지만,
 *   데이터 조회 요청 시에는 이런 리소스들을 필요로 하지 않기 때문에
 *   데이터 조회 요청은 DOMContentLoaded 이벤트가 발생되었을 때 실행합니다.
 */
document.addEventListener("DOMContentLoaded", () => {
  renderTopNews();
  renderLatestNews();
});

/**
 * #topNewsList 영역에 로딩 이미지를 표시합니다.
 */
function renderTopNews() {
  // #topNewsList 영역에 로딩 이미지를 표시합니다.
  const articleSection = document.getElementById("topNewsList");
  createSpinner(articleSection);

  // 서버로 데이터 요청을 시작합니다.
  setTimeout(() => {
    // 서버로부터 데이터를 받아옵니다.
    fetch("/data/top.json")
      .then((res) => res.json())
      .then((data) => {
        // 응답으로 받은 article 목록을 HTML Element 로 변환하여 #topNewsList 영역에 표시합니다.
        const { articles } = data;
        const articleElements = articles.map((article) => createTopNewsElement(article));
        articleSection.append(...articleElements);
        console.log("top articles : ", articles);
      })
      .finally(() => {
        hideSpinner(articleSection);
      });
  }, 1500);
}

/**
 * .latest-news-list 영역에 로딩 이미지를 표시합니다.
 */
function renderLatestNews() {
  // .latest-news-list 영역에 로딩 이미지를 표시합니다.
  const latestNewsList = document.querySelector(".latest-news-list");
  createSpinner(latestNewsList);

  // 서버로 데이터 요청을 시작합니다.
  setTimeout(() => {
    // 서버로부터 데이터를 받아옵니다.
    fetch("/data/latest.json")
      .then((res) => res.json())
      .then((data) => {
        // 응답으로 받은 article 목록을 HTML Element 로 변환하여 #topNewsList 영역에 표시합니다.
        const { articles } = data;
        const articleElements = articles.map((article) => createLatestNewsElement(article));
        latestNewsList.append(...articleElements);
      })
      .finally(() => {
        hideSpinner(latestNewsList);
      });
  }, 1500);
}

/**
 * /data/top.json 내 articles 배열에 포함된 단일 article 데이터를 받아서 HTML Element 로 변환합니다.
 * @param article /data/top.json 내 articles 배열에 포함된 단일 article 데이터
 * @return {HTMLAnchorElement} HTMLElement 변환 결과
 */
function createTopNewsElement(article) {
  // 단일 article 데이터에서 각 값들을 추출합니다.
  const { title, summary, link, thumbnailImage } = article;

  // 추출된 각 값들을 표시해 주는 a 요소를 생성합니다.
  const anchor = document.createElement("a");
  anchor.setAttribute("href", link);
  anchor.innerHTML = `
    <article class="news">
      <div class="information">
        <h3 class="title">${title}</h3>
        <p class="description">${summary}</p>
      </div>
      <div class="thumbnail-area">
        <img src="${thumbnailImage}" alt="thumbnail" class="thumbnail">
      </div>
    </article>
  `;

  // 생성된 a 요소를 반환합니다.
  return anchor;
}






/**
 * /data/latest.json 내 articles 배열에 포함된 단일 article 데이터를 받아서 HTML Element 로 변환합니다.
 * @param article /data/top.json 내 articles 배열에 포함된 단일 article 데이터
 * @return {HTMLLIElement} HTMLElement 변환 결과
 */
function createLatestNewsElement(article) {
  // 단일 article 데이터에서 각 값들을 추출합니다.
  const { title, link } = article;

  // 추출된 각 값들을 표시해 주는 a 요소를 생성합니다.
  const anchor = document.createElement("a");
  anchor.setAttribute("href", link);
  anchor.textContent = title;

  // a 요소를 감싸는 li 요소를 생성합니다.
  const listItem = document.createElement("li");
  listItem.className = "latest-news-item";
  listItem.append(anchor);

  // 생성된 li 요소를 반환합니다.
  return listItem;
}
