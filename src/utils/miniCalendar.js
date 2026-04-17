import dayjs from "../day.js";
import {  overlay } from "../calendarSync.js";
import createMonthGrid from "../month.js";
import { config } from "./config/config.js";



const miniCalendar = document.querySelector(".mini-calendar-container")
const showModal = document.querySelector(".day-select");

let yearInput = document.querySelector(".input-year");
let monthInput = document.querySelector(".input-month");
let dayInput = document.querySelector(".input-day");


export function updateMIniStates(){
    yearInput.placeholder = overlay.date.format("YYYY"); 
    monthInput.placeholder = overlay.date.format("MM"); 
    dayInput.placeholder = overlay.date.format("DD"); 
}


 export function setuserDate(e){
    
        const year = yearInput.value.trim(); //evito spazi vuoti
        const month = monthInput.value.trim();
        const day = dayInput.value.trim();

        if (year && month && day){
            let date = dayjs()
                .set("year", parseInt(year))
                .set("month", parseInt(month) - 1)
                .set("date", parseInt(day)).format("YYYY-MM-DD");
                
                // localStorage.setItem("userDate", JSON.stringify(date))
                overlay.setDate(dayjs(date))
                showModal.classList.remove("show-mini-calendar")
                        
          }else {
                showModal.classList.remove("show-mini-calendar")
          }
       };

// function updateYear(){
    
//      yearInput.addEventListener("input", () => {
//         console.log(yearInput.value)
//          overlay.date = dayjs().year(yearInput.value)
//         const year = parseInt(yearInput.value)
//          if(year >= 1900 && year <= 2200){
//             overlay.syncAll()
//          }
         
// });
// }

// updateYear()

function updateDateinput(part, value){
    const num = parseInt(value)
    if(isNaN(num))return

    switch(part) {
        case "year":
            if (num < 1900 || num > 2200) return;
            overlay.date = overlay.date.year(num);
            break;
        case "month":
            if (num < 1 || num > 12) return;
            overlay.date = overlay.date.month(num - 1); // month da 0
            break;
        case "day":
            if (num < 1 || num > 31) return; // puoi aggiungere check mese/anno
            overlay.date = overlay.date.date(num);
            break;
    }
    overlay.syncAll();
}

yearInput.addEventListener("input", ()=> updateDateinput("year", yearInput.value))
monthInput.addEventListener("input", ()=> updateDateinput("month", monthInput.value))
dayInput.addEventListener("input", ()=> updateDateinput("day", dayInput.value))


function closeMiniCalendar(e){
    if(!showModal.classList.contains("show-mini-calendar"))return;
    if(showModal.classList.contains("show-mini-calendar")){
        //closest contiene anche la classe del carouesello per la scelta del mese
        if(!showModal.contains(e.target) && !e.target.closest(".big-numbers, .mini-month-item")){
            setuserDate()
           
        }
    }
}

    //  document.addEventListener("keyup", (e) => {
    //             if (e.key === "Enter"){  
    //                     setuserDate()
                        
    //               }})

document.addEventListener("click", closeMiniCalendar)


export function createMiniCalendar(newDate){
    // const miniMonth = globalDate.format("MMMM")

    miniCalendar.innerHTML = "";
    const miniMonth = newDate.month(newDate.month()).format("MMMM");
    const miniYear = newDate.year()
    const div = document.createElement("div")
    div.classList.add("mini-container")

    const btnsCont = document.createElement("div")
    btnsCont.classList.add("mini-btns-cont")

    const monthBtn = document.createElement("button")
    monthBtn.classList.add("mini-month-btn")
    monthBtn.setAttribute("type", "button")
    monthBtn.innerText = `${miniMonth}`

    const monthCaroseul = document.createElement("div");
    monthCaroseul.classList.add("month-lists");
    monthBtn.appendChild(monthCaroseul)
    
    const yearBtn = document.createElement("button")
    yearBtn.classList.add("mini-year-btn")
    yearBtn.setAttribute("type", "button")
    yearBtn.innerText = `${miniYear}`

    btnsCont.appendChild(monthBtn)
    btnsCont.appendChild(yearBtn)
    div.appendChild(btnsCont)
    miniCalendar.appendChild(div)
    
    const gridCalendar = document.createElement("div")
    gridCalendar.classList.add("mini-grid")
    div.appendChild(gridCalendar)

     createMonthGrid(newDate, gridCalendar, config.mini)
     monthcorousel()
}
//il return del div mi serve perchè così el viene associato a quel elemento del DOm ovvero il div appunto
function createElement(father, elClass, el){
    const div = document.createElement("div")
    div.classList.add(elClass)
    father.appendChild(div)
    div.innerText = el
    return div
}
//devo ricordarmi che gli event listener accetano callBackl/reference, non posso chimare direttamente la funzione, perchè essa verrebbe eseguita senza aspettare al click

function monthcorousel(){
    const carousel = document.querySelector(".mini-month-btn");
    const monthCaroseul = document.querySelector(".month-lists")
    const months = Array.from({length: 12}, (_, i) => dayjs().month(i).format("MMMM"))
    carousel.addEventListener("click",()=>{
     monthCaroseul.classList.toggle("show-carousel")
    } )
  months.forEach((month, index) =>{
    const el = createElement(monthCaroseul, "mini-month-item", month)
        el.addEventListener("click", () => {
        overlay.date = overlay.date.month(index)
        overlay.syncAll()
        monthCaroseul.classList.remove("show-carousel")
  })

  } )
}


updateMIniStates()
createMiniCalendar(overlay.date)
setuserDate()