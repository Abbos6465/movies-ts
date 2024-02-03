import { getMovies, getVideo, getCategories } from "./movies/index.js";
import { $, $$, createElement } from "./utils/pulign.js";
import { setPagination } from "./components/ui/app-pagination.js";
import { toggleModal } from "./components/ui/app-modal.js";
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
const movieModalOverlay = $("#movieModalOverlay");
const movieModalIframe = $(".home__movie-modal__iframe");
const showMovie = (id) => {
    const movie = getVideo(id);
    if (movie)
        movieModalIframe.src = movie.video_url;
    toggleModal();
};
movieModalOverlay.addEventListener("click", () => {
    movieModalIframe.src = "";
});
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
const categories = getCategories();
const movieCategorySelect = $("#categorySelect");
categories.forEach(el => {
    const optionElement = new Option(el.name, el.id);
    movieCategorySelect.options.add(optionElement);
});
const renderMovies = () => {
    fetchMovies();
    movies.forEach(el => {
        var _a, _b, _c;
        let homeCard = createElement('div', 'app-card home__card', `
        // homeCard.dataset.movieId=el.id;
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
const movieName = $("#movieName");
const movieRate = $("#movieRate");
const filterMovies = () => {
    if (movieName.value.trim().length)
        filterForm.name = movieName.value;
    if (movieRate.value)
        filterForm.rate = +movieRate.value;
    if (movieCategorySelect.value)
        filterForm.category = movieCategorySelect.value;
    if (filterForm.name || filterForm.rate || filterForm.category)
        renderMovies();
};
const moviesSearchBtn = $("#moviesSearchBtn");
moviesSearchBtn.addEventListener("click", filterMovies);