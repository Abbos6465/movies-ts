import { $ } from "./pulign.js";
const body = $("body");
export const toggleScrolling = () => {
    body.classList.toggle("overflow-hidden");
};
