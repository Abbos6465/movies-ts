import moviesData from "./moviesData.js";
const movies = moviesData.map(el => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return {
        title: (_a = el === null || el === void 0 ? void 0 : el.title) !== null && _a !== void 0 ? _a : '',
        year: (_b = el === null || el === void 0 ? void 0 : el.year) !== null && _b !== void 0 ? _b : null,
        categories: (_c = el === null || el === void 0 ? void 0 : el.categories) !== null && _c !== void 0 ? _c : [],
        id: (_d = el === null || el === void 0 ? void 0 : el.imdbId) !== null && _d !== void 0 ? _d : null,
        rating: (_e = el === null || el === void 0 ? void 0 : el.imdbRating) !== null && _e !== void 0 ? _e : 0,
        time: `${Math.trunc(el.runtime / 60)} soat ${el.runtime % 60} daqiqa`,
        lang: (_f = el === null || el === void 0 ? void 0 : el.language) !== null && _f !== void 0 ? _f : '',
        video_url: `https://www.youtube.com/embed/${el.youtubeId}`,
        summary: (_g = el === null || el === void 0 ? void 0 : el.summary) !== null && _g !== void 0 ? _g : '',
        smallImg: (_h = el === null || el === void 0 ? void 0 : el.smallThumbnail) !== null && _h !== void 0 ? _h : '',
        largeImg: (_j = el === null || el === void 0 ? void 0 : el.bigThumbnail) !== null && _j !== void 0 ? _j : '',
    };
});
const defaultMoviesParams = {
    page: 1
};
const per_page = 12;
const total_page = movies.length;
const last_page = total_page ? Math.ceil(total_page / per_page) : 0;
const getMovies = (params = defaultMoviesParams) => {
    if (!Object.keys(params).length)
        return {
            data: [],
            page: 0,
            per_page: 0,
            last_page: 0,
        };
    let newMovies = [];
    if (params.name || params.category || params.rate) {
        movies.forEach(el => {
            let hasName = false;
            let hasRate = false;
            let hasCategory = false;
            const title = el.title.toLowerCase();
            const rate = Math.floor(el.rating);
            if (params.name)
                hasName = title.search(params.name.toLowerCase()) !== -1;
            if (params.rate)
                hasRate = rate === Math.floor(params.rate);
            if (params.category)
                hasCategory = !!el.categories.find(category => category === params.category);
            if (hasName || hasRate || hasCategory)
                newMovies.push(el);
        });
    }
    else
        newMovies = movies;
    const startIndex = (params.page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const data = newMovies.slice(startIndex, endIndex);
    return {
        data: data,
        page: params.page,
        per_page: per_page,
        last_page: last_page
    };
};
const getVideo = (id) => { var _a; return (_a = movies.find(el => el.id === id)) !== null && _a !== void 0 ? _a : {}; };
export { getMovies, getVideo, };
