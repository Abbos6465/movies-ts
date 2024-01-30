export const $ = (selector) => {
    return document.querySelector(selector);
};
export const $$ = (selector) => {
    return document.querySelectorAll(selector);
};
export const createElement = (tagName, className, content) => {
    const newElement = document.createElement(tagName);
    if (className)
        newElement.setAttribute("class", className);
    if (content)
        newElement.innerHTML = content;
    return newElement;
};
