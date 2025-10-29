import dayjs from "./day.js";
import { isNow } from "./isNow.js";

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
  const currentMonthDisplay = document.querySelector(".big-numbers.text") ;

// modal per selezionare la data
const modal = document.getElementById("select-day");
const showModal = document.querySelector(".day-select");
const reset = document.querySelector(".reset");
 let yearInput = document.querySelector(".input-year");
 let monthInput = document.querySelector(".input-month");
let dayInput = document.querySelector(".input-day");

yearInput.placeholder = dayjs().format("YYYY"); 
monthInput.placeholder = dayjs().format("MM"); 
dayInput.placeholder = dayjs().format("DD"); 



currentMonthDisplay.addEventListener("click",dateModal)

export let selectedDate = null; //definisco uno scope per la funzione, per non far ritornare il valore undefined
      //e avevi messo i const year = yearInput.value; fuori dal listener, allora JS li valutava solo al caricamento dello script, e restavano sempre vuoti ("").        

export default function setuserDate(){
                const year = yearInput.value.trim(); //evito spazi vuoti
                const month = monthInput.value.trim();
                const day = dayInput.value.trim();
               
                if (year && month && day){
                 let date = dayjs()
                .set("year", parseInt(year))
                .set("month", parseInt(month) - 1)
                .set("date", parseInt(day)).format("YYYY-MM-DD");
                localStorage.setItem("userDate", JSON.stringify(date))
                showModal.classList.remove("show-modal")
                // document.dispatchEvent(new CustomEvent("userDateChanged", { detail: date }));
                location.reload();            
          }else {
                showModal.classList.remove("show-modal")
          }
       };


     document.addEventListener("keyup", (e) => {
                if (e.key === "Enter"){  
                        setuserDate()
                        
                  }});




document.addEventListener("keyup", (e) => {
        if (e.key === "p"){
                localStorage.clear()
        }
})

function dateModal(){       
        showModal.classList.toggle("show-modal"); 
        };

 
    
// dateSelected(yearInput, monthInput)


//////le seguenti funzioni vanno fattorizzate per renderle riuttilizzabili
//creo lo state
let currentState = 0;
monthView.classList.add("show-section");
OverlayMonth.classList.add("show-display");
 ////reset

reset.addEventListener("click", function(){
       
          localStorage.removeItem("userDate");
          location.reload();  
        })
   
// document.addEventListener("DOMContentLoaded", func )

    monthBtn.addEventListener("click", function(){
         if (currentState !== 0 && !monthView.classList.contains("show-section")) {
            monthView.classList.add("show-section");
            weekView.classList.remove("show-section");
            dayView.classList.remove("show-section");
            OverlayWeek.classList.remove("show-display");
            OverlayMonth.classList.add("show-display");
            OverlayDay.classList.remove("show-display");
            currentState = 0;
    } else if ( currentState === 0 ){
            return
    }
    })

   weekBtn.addEventListener("click", function(){
    if (currentState !== 1 && !weekView.classList.contains("show-section")) {
            monthView.classList.remove("show-section");
            weekView.classList.add("show-section");
            dayView.classList.remove("show-section");
            OverlayWeek.classList.add("show-display");
            OverlayMonth.classList.remove("show-display");
            OverlayDay.classList.remove("show-display");
            currentState = 1;
    } else if ( currentState === 1 ){
            return
    }
    })

       dayBtn.addEventListener("click", function(){
    if (currentState !== 2 && !dayView.classList.contains("show-section")) {
            monthView.classList.remove("show-section");
            weekView.classList.remove("show-section");
            dayView.classList.add("show-section");
            OverlayWeek.classList.remove("show-display");
            OverlayMonth.classList.remove("show-display");
            OverlayDay.classList.add("show-display");
            currentState = 2;
            isNow()
    } else if ( currentState === 2 ){
            return
    }
    })
   
//funzione modulare....
// function switchView(targetIndex) {
//   const views = [monthView, weekView, dayView];
//   const overlays = [OverlayMonth, OverlayWeek, OverlayDay];

//   if (currentState !== targetIndex) {
//     views.forEach((v, i) => v.classList.toggle("show-section", i === targetIndex));
//     overlays.forEach((o, i) => o.classList.toggle("show-display", i === targetIndex));
//     currentState = targetIndex;
//   }
// }



export {showModal}