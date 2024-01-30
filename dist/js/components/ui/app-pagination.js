import { createElement } from "../../utils/pulign.js";
export default (name, current_page, last_page) => {
    if (last_page <= 1)
        return null;
    const appPagination = createElement("div", "app-pagination");
    const appPaginationList = createElement("ul", "app-pagination__list", `
        `<li class="app-pagination__item app-pagination__item-prev">
        : ''}
    const threeDotsItem = createElement('li', 'app-pagination__item', '...');
    if (current_page >= 3)
        appPaginationList.appendChild(threeDotsItem);
    const activeItem = createElement("li", "app-pagination__item", `
    appPaginationList.appendChild(activeItem);
    if (current_page <= last_page - 2)
        appPaginationList.appendChild(threeDotsItem);
    if (current_page < last_page) {
        const lastItem = createElement('li', 'app-pagination__item', `
        appPaginationList.appendChild(lastItem);
        const nextItem = createElement('li', 'app-pagination__item app-pagination__item-next', `
        appPaginationList.appendChild(nextItem);
    }
    appPagination.appendChild(appPaginationList);
    return appPagination;
};