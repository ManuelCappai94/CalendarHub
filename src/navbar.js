import dayjs from "./day.js";
import { isNow } from "./isNow.js";
import { openMiniCalendar } from "./utils/miniCalendar.js";

//elementi bottone
const monthBtn = document.getElementById("month-btn");
const weekBtn = document.getElementById("week-btn");
const dayBtn = document.getElementById("day-btn");

//nodi del cambio visuale
const monthView = document.querySelector(".month-view");
const weekView = document.querySelector(".week-view");
const dayView = document.querySelector(".day-view");

// //overlay che cambia con la vista, bisogna selezionarli 1 ad uno;
  const OverlayMonth = document.querySelector(".display-overlay.month");
  const OverlayWeek = document.querySelector(".display-overlay.week");
  const OverlayDay = document.querySelector(".display-overlay.day");
//   const currentMonthDisplay = document.querySelector(".big-numbers.text") ;
  const allOverlays = document.querySelectorAll(".big-numbers.text")
  

  allOverlays.forEach(overlay => {
        overlay.addEventListener("click", openMiniCalendar)
  })

// modal per selezionare la data

const showModal = document.querySelector(".day-select");
const reset = document.querySelector(".reset");


// currentMonthDisplay.addEventListener("click",dateModal);
 

document.addEventListener("keyup", (e) => {
        if (e.key === "p"){
                localStorage.clear()
        }
})

// function dateModal(){       
//         showModal.classList.toggle("show-mini-calendar"); 
//         };

 
    
//creo lo state, il numero corrisponderà al targhet index negli array
let currentState = 0;
monthView.classList.add("show-section");
OverlayMonth.classList.add("show-display");
 ////reset

reset.addEventListener("click", function(){
          localStorage.removeItem("userDate");
          location.reload();  
        })

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

    monthBtn.addEventListener("click", () => {
         switchView(0)
    }
       
     )

   weekBtn.addEventListener("click", () => {
         switchView(1)
   }
       
    )

       dayBtn.addEventListener("click", () =>{
         switchView(2)
            isNow()
       }
       
   )
   



// export {showModal}