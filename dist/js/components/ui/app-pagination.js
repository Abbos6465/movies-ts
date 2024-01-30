import { createElement } from "../../utils/pulign.js";
export default (name, current_page, last_page) => {
    if (last_page <= 1)
        return null;
    const appPagination = createElement("div", "app-pagination");
    const appPaginationList = createElement("ul", "app-pagination__list", `        ${current_page > 1 ?
        `<li class="app-pagination__item app-pagination__item-prev">            <button               data-id="${name}_prev"               class="app-pagination__btn"              >                <img                    src = "/dist/images/icons/prev.svg"                    alt = "Prev icon"                    class="app-pagination__icon"                />            </button>        </li>        <li class="app-pagination__item app-pagination__item-prev">          <button            data-id="${name}_1"            class="app-pagination__btn"          >              1          </button>        </li>`
        : ''}    `);
    const threeDotsItem = createElement('li', 'app-pagination__item', '...');
    if (current_page >= 3)
        appPaginationList.appendChild(threeDotsItem);
    const activeItem = createElement("li", "app-pagination__item", `         <button         data-id="${name}_${current_page}"           class="app-pagination__btn app-pagination__btn--active"         >          ${current_page}        </button>    `);
    appPaginationList.appendChild(activeItem);
    if (current_page <= last_page - 2)
        appPaginationList.appendChild(threeDotsItem);
    if (current_page < last_page) {
        const lastItem = createElement('li', 'app-pagination__item', `            <button              data-id="${name}_${last_page}"              class="app-pagination__btn"            >              ${last_page}            </button>        `);
        appPaginationList.appendChild(lastItem);
        const nextItem = createElement('li', 'app-pagination__item app-pagination__item-next', `            <button              data-id="${name}_next"               class="app-pagination__btn"            >              <img                src = "/dist/images/icons/prev.svg"                alt="next icon"                class="app-pagination__icon"              />            </button>        `);
        appPaginationList.appendChild(nextItem);
    }
    appPagination.appendChild(appPaginationList);
    return appPagination;
};
