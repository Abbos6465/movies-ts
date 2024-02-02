import { getMovies } from "./movies/index.js";
import { $, $$, createElement } from "./utils/pulign.js";
import { setPagination } from "./components/ui/app-pagination.js";
const filterForm = {
    name: "",
    rate: null,
    category: "",
    page: 1,
};
const moviesLoader = $("#moviesLoader");
const homeCards = $(".home__cards");
const moviesData = $("#moviesData");
const homeFooter = $("#homeFooter");
const showMovie = (id) => {
    console.log(id);
};
let moviesIsLoading = true;
const paginationName = "movies";
const videoBoxClick = () => {
    const homeCardVideoBoxes = $$('.home__card__video-box');
    homeCardVideoBoxes.forEach(el => {
        el.addEventListener("click", event => {
            const currentTarget = event.currentTarget;
            if (currentTarget) {
                const id = currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.getAttribute('data-id');
                if (id)
                    showMovie(id);
            }
        });
    });
};
let movies = [];
let activePage = 1;
let lastPage;
const fetchMovies = () => {
    const { data, page, last_page } = getMovies(filterForm);
    moviesIsLoading = true;
    moviesData.style.display = "none";
    moviesLoader.style.display = moviesIsLoading ? "" : "none";
    movies = data;
    activePage = page;
    lastPage = last_page;
    homeCards.innerHTML = "";
    homeFooter.innerHTML = "";
    setTimeout(() => {
        moviesData.style.display = "";
        moviesIsLoading = false;
        moviesLoader.style.display = moviesIsLoading ? "" : "none";
    }, 500);
};
const renderMovies = () => {
    fetchMovies();
    movies.forEach(el => {
        var _a, _b;
        let homeCard = createElement('div', 'app-card home__card', `               <div class="app-card__header">                <button                    data-id="${el.id}"                    class="home__card__video-box video-box app-card__img-wrapper"                >                  <img                      class="video-box__img app-card__img"                      src="${el.smallImg}"                      alt="Movie img"                  >                </button>              </div>              <div class="app-card__body">                <h3 class="app-card__title">                  ${el.title}               </h3>                <ul class="home__card__list">                  <li class="home__card__list__item">                    <span class="home__card__list__item-title">                        Year:                    </span>                    <span class="home__card__list__item-text">                        ${el.year}                    </span>                  </li>                  <li class="home__card__list__item">                    <span class="home__card__list__item-title">                        Category:                    </span>                    <span class="home__card__list__item-text">                      ${(_a = el === null || el === void 0 ? void 0 : el.categories.join(', ')) !== null && _a !== void 0 ? _a : ''}                     </span>                  </li>                  <li class="home__card__list__item">                    <span class="home__card__list__item-title">                        Rating:                    </span>                    <span class="home__card__list__item-text">                      ${(_b = el === null || el === void 0 ? void 0 : el.rating) !== null && _b !== void 0 ? _b : ''}                     </span>                  </li>                </ul>              </div>        `);
        homeCard.dataset.moieId = el.id;
        homeCards.appendChild(homeCard);
    });
    const pagination = setPagination(paginationName, activePage, lastPage);
    homeFooter.appendChild(pagination);
    videoBoxClick();
    paginationHandler();
};
const paginationHandler = () => {
    const pagination = $(`#${paginationName}-pagination`);
    if (pagination) {
        const paginationButtons = pagination.querySelectorAll('.app-pagination__btn');
        paginationButtons.forEach(el => {
            el.addEventListener("click", event => {
                const currentTarget = event.currentTarget;
                if (currentTarget) {
                    const dataId = currentTarget === null || currentTarget === void 0 ? void 0 : currentTarget.getAttribute('data-id');
                    if (dataId) {
                        if (dataId === 'prev')
                            activePage--;
                        else if (dataId === 'next')
                            activePage++;
                        else
                            activePage = +dataId;
                        filterForm.page = activePage;
                        fetchMovies();
                        renderMovies();
                    }
                }
            });
        });
    }
};
renderMovies();
