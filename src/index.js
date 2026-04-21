
import { initNavbar } from "./navbar.js";
import initCalendar from "./calendarSync.js";
import { initTutorial } from "./tutorial.js";

///blocca tutti i comportamenti di selezione del testo della padina di defualt con il doppio click e la selezione
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", ()=>{
  initCalendar()
  initNavbar()
  initTutorial()
})




document.addEventListener("keyup", (e)=>{
  if(e.key === "p"){
    localStorage.clear()
  }
})


