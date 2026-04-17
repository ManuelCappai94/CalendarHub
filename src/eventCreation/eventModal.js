import { getData, preCompiler } from "./eventLogic.js";

const modalEvents = document.querySelector(".event-container")
const modalOverlay = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn")


function openModal(e) {
    const rect = e.target.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight;
    let top, left;

    modalOverlay.classList.add("show-overlay");
    modalEvents.classList.add("show-container")
    //controllo verticale, ritorna boolenano falso se sta giu, true se in alto
    const hasSpaceBelow = rect.bottom + modalEvents.clientHeight <= viewportHeight
    const hasSpaceAbove = rect.top - modalEvents.clientHeight >= 0;
    // ---- controllo orizzontale ----
    const hasSpaceRight = rect.right  + modalEvents.clientWidth <= viewportWidth;
    const hasSpaceLeft = rect.left  -  modalEvents.clientWidth >= 0;
    //quello che fa closest, è cercare riferiferimenti a quella classe, o attributo "data-action" nel nodo più vicino
    const isDailyview = e.target.closest(".day-box, .day-half-box")

    if(viewportWidth<= 992){
        top = viewportHeight/2 - modalEvents.clientHeight/2
        left = viewportWidth/2 - modalEvents.clientWidth/2
    }else{
        if(!isDailyview){
        if(hasSpaceBelow || !hasSpaceAbove){
        top = rect.top 
        } else{
            top = rect.bottom - modalEvents.clientHeight 
        }

        if (hasSpaceRight || !hasSpaceLeft) {
            // default: apro a destra
            left = rect.right ;
        } else {
            left = rect.left -  modalEvents.clientWidth ;
        }
    }
     if(isDailyview){
        // console.log(test)
        if(hasSpaceBelow || !hasSpaceAbove){
            top = rect.top 
        } else{
            top = rect.bottom - modalEvents.clientHeight 
        }
        left = viewportWidth/2 - modalEvents.clientWidth/2
    }
   }
  modalEvents.style.top = `${top}px`;
  modalEvents.style.left = `${left}px`;
    getData(e)
    preCompiler(e)
}

 function closeModal(){
    closeBtn.addEventListener("click", function(){
        modalOverlay.classList.remove("show-overlay");
        modalEvents.classList.remove("show-container")
    })
    modalEvents.style.top = "";
    modalEvents.style.left = "";
} 
closeModal()

export default openModal