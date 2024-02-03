import { $ } from "../../utils/pulign.js";
import { toggleScrolling } from "../../utils/helper.js";
const appModal = $(".app-modal");
const appModalBody = appModal.querySelector(".app-modal__body");
const appModalOverlay = appModal.querySelector(".app-modal__overlay");
const toggleFlex = () => {
    appModal.classList.toggle("d-flex");
};
export const toggleModal = () => {
    toggleFlex();
    toggleScrolling();
};
appModalOverlay.addEventListener("click", toggleModal);
