import { getMovies } from "./movies/index.js";
import { $, $$, createElement } from "./utils/pulign.js";
import appPagination from "./components/ui/app-pagination.js";
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
const paginanitonName = "movies";
const renderMovies = () => {
    const { data: movies, page, last_page } = getMovies(filterForm);
    moviesIsLoading = true;
    moviesData.style.display = "none";
    movies.forEach(el => {
        var _a, _b;
        let homeCard = createElement('div', 'app-card home__card', `               <div class="app-card__header">                <button                    data-id="${el.id}"                    class="home__card__video-box video-box app-card__img-wrapper"                >                  <img                      class="video-box__img app-card__img"                      src="${el.smallImg}"                      alt="Movie img"                  >                </button>              </div>              <div class="app-card__body">                <h3 class="app-card__title">                  ${el.title}               </h3>                <ul class="home__card__list">                  <li class="home__card__list__item">                    <span class="home__card__list__item-title">                        Year:                    </span>                    <span class="home__card__list__item-text">                        ${el.year}                    </span>                  </li>                  <li class="home__card__list__item">                    <span class="home__card__list__item-title">                        Category:                    </span>                    <span class="home__card__list__item-text">                      ${(_a = el === null || el === void 0 ? void 0 : el.categories.join(', ')) !== null && _a !== void 0 ? _a : ''}                     </span>                  </li>                  <li class="home__card__list__item">                    <span class="home__card__list__item-title">                        Rating:                    </span>                    <span class="home__card__list__item-text">                      ${(_b = el === null || el === void 0 ? void 0 : el.rating) !== null && _b !== void 0 ? _b : ''}                     </span>                  </li>                </ul>              </div>        `);
        homeCard.dataset.moieId = el.id;
        homeCards.appendChild(homeCard);
    });
    const pagination = appPagination(paginanitonName, page, last_page);
    homeFooter.appendChild(pagination);
    setTimeout(() => {
        moviesData.style.display = "";
        moviesIsLoading = false;
        moviesLoader.style.display = moviesIsLoading ? "" : "none";
    }, 1000);
};
renderMovies();
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
