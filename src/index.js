
import { initNavbar } from "./navbar.js";
import initCalendar from "./calendarSync.js";
import { initTutorial } from "./tutorial.js";
import { initEventModal } from "./eventCreation/eventModal.js";
import { initOptionsBanner } from "./eventCreation/infoBanner.js";

///blocca tutti i comportamenti di selezione del testo della padina di defualt con il doppio click e la selezione
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", ()=>{
  initCalendar()
  initNavbar()
 initOptionsBanner()
  initTutorial()
  initEventModal()
})




// document.addEventListener("keyup", (e)=>{
//   if(e.key === "p"){
//     localStorage.clear()
//   }
// })


