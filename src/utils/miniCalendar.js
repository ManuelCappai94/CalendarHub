import dayjs from "../day.js";
import {  overlay } from "../utils.js";
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
        console.log(yearInput.value)
               
        if (year && month && day){
            let date = dayjs()
                .set("year", parseInt(year))
                .set("month", parseInt(month) - 1)
                .set("date", parseInt(day)).format("YYYY-MM-DD");
                localStorage.setItem("userDate", JSON.stringify(date))
                showModal.classList.remove("show-mini-calendar")
                // document.dispatchEvent(new CustomEvent("userDateChanged", { detail: date }));
                location.reload();            
          }else {
                showModal.classList.remove("show-mini-calendar")
          }
       };


     document.addEventListener("keyup", (e) => {
                if (e.key === "Enter"){  
                        setuserDate()
                        
                  }})




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
}


updateMIniStates()
createMiniCalendar(overlay.date)
setuserDate()