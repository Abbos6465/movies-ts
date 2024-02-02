import { createElement } from "../../utils/pulign.js";
const id = (name) => {
    return `${name}-pagination`;
};
export const setPagination = (name, current_page, last_page) => {
    if (last_page <= 1)
        return null;
    const appPagination = createElement("div", "app-pagination");
    appPagination.setAttribute("id", id(name));
    const appPaginationList = createElement("ul", "app-pagination__list", `        ${current_page > 1 ?
        `<li class="app-pagination__item app-pagination__item-prev">            <button               data-id="prev"               class="app-pagination__btn"              >                <img                    src = "/dist/images/icons/prev.svg"                    alt = "Prev icon"                    class="app-pagination__icon"                />            </button>        </li>        <li class="app-pagination__item app-pagination__item-prev">          <button            data-id="1"            class="app-pagination__btn"          >              1          </button>        </li>`
        : ''}    `);
    const threeDotsItem = createElement('li', 'app-pagination__item', '...');
    if (current_page >= 3)
        appPaginationList.appendChild(threeDotsItem);
    const activeItem = createElement("li", "app-pagination__item", `         <button         data-id="${current_page}"           class="app-pagination__btn app-pagination__btn--active"         >          ${current_page}        </button>    `);
    appPaginationList.appendChild(activeItem);
    if (current_page <= last_page - 2)
        appPaginationList.appendChild(threeDotsItem);
    if (current_page < last_page) {
        const lastItem = createElement('li', 'app-pagination__item', `            <button              data-id=${last_page}              class="app-pagination__btn"            >              ${last_page}            </button>        `);
        appPaginationList.appendChild(lastItem);
        const nextItem = createElement('li', 'app-pagination__item app-pagination__item-next', `            <button              data-id="next"               class="app-pagination__btn"            >              <img                src = "/dist/images/icons/prev.svg"                alt="next icon"                class="app-pagination__icon"              />            </button>        `);
        appPaginationList.appendChild(nextItem);
    }
    appPagination.appendChild(appPaginationList);
    return appPagination;
};
// export const changePagination = (name: string, page: number): number | null => {
//     const paginationId: string = id(name);
//     const pagination = <HTMLDivElement> $(`#${paginationId}`);
//     let activePage:number = page;
//
//     if(!pagination){
//         console.error(`${paginationId} lik element mavjud emas`);
//         return null;
//     }
//
//     const paginationButtons = pagination.querySelectorAll('.app-pagination__btn') as NodeListOf<HTMLButtonElement>;
//
//     paginationButtons.forEach(el => {
//         el.addEventListener("click", event => {
//             const currentTarget = <HTMLButtonElement>event.currentTarget;
//             if(currentTarget){
//                 const dataId:string | null = currentTarget?.getAttribute('data-id');
//                 if(dataId){
//                     if(dataId === 'prev') activePage--;
//                     else if(dataId === 'next') activePage++;
//                     else activePage = +dataId;
//                     console.log(activePage);
//                     changePagination(name, activePage);
//                 }
//             }
//         });
//     });
//     return activePage;
// }
