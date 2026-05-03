import { getData, preCompiler } from "./eventLogic.js";
import { initEventFormEvents } from "./eventLogic.js";
import getFloatingPosition from "../utils/helpers/floatingPositioner.js";


const modalEvents = document.querySelector(".event-container")
const modalOverlay = document.querySelector(".modal-overlay");



function openModal(e) {
    const rect = e.target.getBoundingClientRect()
    modalOverlay.classList.add("show-overlay");
    modalEvents.classList.add("show-container")
    const isDailyview = e.target.closest(".day-box, .day-half-box")
    getFloatingPosition(modalEvents, rect, isDailyview)

    getData(e)
    preCompiler(e)
    
}

 
export function initEventModal(){
    initEventFormEvents()
}


export default openModal