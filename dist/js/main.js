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
        let homeCard = createElement('div', 'app-card home__card', `
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