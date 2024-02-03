import { createElement } from "../../utils/pulign.js";
const id = (name) => {
    return `${name}-pagination`;
};
export const setPagination = (name, current_page, last_page) => {
    if (last_page <= 1)
        return null;
    const appPagination = createElement("div", "app-pagination");
    appPagination.setAttribute("id", id(name));
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