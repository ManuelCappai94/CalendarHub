
import { initNavbar } from "./navbar.js";
import initCalendar from "./calendarSync.js";
import { initTutorial } from "./tutorial.js";
import { initEventModal } from "./eventCreation/eventLogic.js";
import { initOptionsBanner } from "./eventCreation/infoBanner.js";
import {  appready } from "./utils/loader/loader.js";
import { initiMiniCalendarInputs } from "./miniCalendar/miniCalendar.js";
import { initToDobinds } from "./to-do-list/toDo.js";


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
  initiMiniCalendarInputs()
  initToDobinds()
  appready()
})




// document.addEventListener("keyup", (e)=>{
//   if(e.key === "p"){
//     localStorage.clear()
//   }
// })


