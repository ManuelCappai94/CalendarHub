import dayjs from "./day.js";
import { isNow } from "./utils/isNow.js";
import { openMiniCalendar } from "./utils/miniCalendar.js";
import { overlay } from "./calendarSync.js";
import { initTodo } from "./to-do-list/toDo.js";
import { resetTutorial } from "./tutorial.js";

//elementi bottone
const monthBtn = document.getElementById("month-btn");
const weekBtn = document.getElementById("week-btn");
const dayBtn = document.getElementById("day-btn");

//nodi del cambio visuale
const monthView = document.querySelector(".month-view");
const weekView = document.querySelector(".week-view");
const dayView = document.querySelector(".day-view");

const OverlayMonth = document.querySelector(".display-overlay.month");
const OverlayWeek = document.querySelector(".display-overlay.week");
const OverlayDay = document.querySelector(".display-overlay.day");

const allOverlays = document.querySelectorAll(".big-numbers.text")
const reset = document.querySelector(".reset");
const newTodo = document.querySelector(".new-btn")
const tutorialBtn = document.querySelector(".tutorial-btn")

let currentState = 0;

///decido la schermata da visualizzare in base all'index che passo alla funzione, nel forEach mi serve anche il secono parametro che accetta cosi che posso settare l'index corretto. questo secondo parametro poi lo passo al toggle, perchè? perchè toggle accetta due parametri, il primo è il token dove, che è la stringa della classe, il secondo è il paramentro force. è un booleano, che lo trasforma in un one-way-only operator, cioe  che la classe sarà solo tolta e non aggiunta e viceversa. quindi si puo utilizzare per indicare quale classe deve essere toccata
function switchView(index){
        const gridView = [monthView, weekView, dayView]
        const overlay = [OverlayMonth, OverlayWeek, OverlayDay]
        if (currentState !== index){
                gridView.forEach((view, i)=> view.classList.toggle("show-section", i === index ))
                overlay.forEach((ov, i)=> ov.classList.toggle("show-display", i === index ))
                currentState = index
        }
}

function initDefaultView(){
        currentState = 0;
        monthView.classList.add("show-section");
        OverlayMonth.classList.add("show-display");

}
function bindNavEvents(){
        allOverlays.forEach(overlay => {
                overlay.addEventListener("click", ()=>openMiniCalendar("normal"))
        })
        monthBtn.addEventListener("click", () => {
         switchView(0)
        })

        weekBtn.addEventListener("click", () => {
         switchView(1)
         isNow()
        })

       dayBtn.addEventListener("click", () =>{
         switchView(2)
         isNow()
        })
        reset.addEventListener("click", function(){
          localStorage.removeItem("userDate");
          overlay.setDate(dayjs())
        })
        newTodo.addEventListener("click", initTodo)
        tutorialBtn.addEventListener("click", resetTutorial )
}

export function initNavbar() {
    initDefaultView();
    bindNavEvents();
}






    
   



