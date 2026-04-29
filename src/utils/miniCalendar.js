import dayjs from "../day.js";
import {  overlay } from "../calendarSync.js";
import createMonthGrid from "../month.js";
import { config } from "./config/config.js";
import createElement from "./helpers/createElement.js";
import { updateEventDraft } from "./events/eventDraft.js";
import { updateEventDateUI } from "./events/eventsUI.js";


const calendarContainer = document.getElementById("mini-calendar")
const displayOverlay = document.querySelectorAll(".display-overlay")
const miniCalendar = document.querySelector(".mini-calendar-container")
const showModal = document.querySelector(".day-select");
const eventDateDiv = document.querySelector(".event-date")
const miniCalendarLayer = document.querySelector(".mini-calendar-layer")



let yearInput = document.querySelector(".input-year");
let monthInput = document.querySelector(".input-month");
let dayInput = document.querySelector(".input-day");

let miniLocalDate = null;
let isEvent = false;

 function syncMiniInputs(){
    if (!miniLocalDate) return;
    yearInput.value = miniLocalDate.format("YYYY");
    monthInput.value = miniLocalDate.format("MM");
    dayInput.value = miniLocalDate.format("DD");
}

export function openMiniCalendar(type) {
    let display, top, left;

    miniLocalDate = dayjs(overlay.date);
    syncMiniInputs();
    createMiniCalendar(miniLocalDate);
    miniCalendarLayer.classList.add("show-mini-calendar-layer")
    if(type === "normal"){
        isEvent = false;
        showModal.classList.add("show-mini-calendar");
        displayOverlay.forEach(item => {
           display = item.closest(".show-display")
           if(!display)return
            const displayRect = display.getBoundingClientRect()
           top = displayRect.top
           left = displayRect.left + 150
        })
        
    }
    if(type === "event"){
        isEvent = true;
        showModal.classList.add("show-mini-calendar");
        const eventDateDivRect =  eventDateDiv.getBoundingClientRect()
        top = eventDateDivRect.top - miniCalendar.clientHeight/2
        left = eventDateDivRect.left 
    }

     calendarContainer.style.top = `${top}px`
     calendarContainer.style.left = `${left}px`
}

export function closeMiniCalendar() {
    miniCalendarLayer.classList.remove("show-mini-calendar-layer")
    showModal.classList.remove("show-mini-calendar");
    calendarContainer.style.top = ""
    calendarContainer.style.left = ""
    isEvent = false
}
export function cancelMiniCalendar() {
    miniLocalDate = dayjs(overlay.date);
    syncMiniInputs();
    createMiniCalendar(miniLocalDate);
    closeMiniCalendar();
}

export function commitMiniDate(){
    if(!miniLocalDate) return;
    if(!isEvent){
        overlay.setDate(dayjs(miniLocalDate));
    } else {
        updateEventDraft("date", miniLocalDate.format("YYYY-MM-DD"))
        updateEventDateUI(miniLocalDate.format("YYYY-MM-DD"))
    }
   
    closeMiniCalendar();
}

// function applyManualDateToMini() {
//     const year = yearInput.value.trim();
//     const month = monthInput.value.trim();
//     const day = dayInput.value.trim();

//     if (!year || !month || !day) return false;

//     const nextDate = dayjs()
//         .set("year", parseInt(year, 10))
//         .set("month", parseInt(month, 10) - 1)
//         .set("date", parseInt(day, 10));

//     if (!nextDate.isValid()) return false;

//     miniLocalDate = nextDate;
//     createMiniCalendar(miniLocalDate);
//     return true;
// }


function updateMiniDatePart(part, value) {
    const num = parseInt(value);
    if (isNaN(num) || !miniLocalDate) return;

    switch (part) {
        case "year":
            if (num < 1900 || num > 2200) return;
            miniLocalDate = miniLocalDate.year(num);
            break;
        case "month":
            if (num < 1 || num > 12) return;
            miniLocalDate = miniLocalDate.month(num - 1);
            break;
        case "day":
            if (num < 1 || num > 31) return;
            miniLocalDate = miniLocalDate.date(num);
            break;
    }

    syncMiniInputs();
    createMiniCalendar(miniLocalDate);
}

yearInput.addEventListener("change", () => updateMiniDatePart("year", yearInput.value));
monthInput.addEventListener("change", () => updateMiniDatePart("month", monthInput.value));
dayInput.addEventListener("change", () => updateMiniDatePart("day", dayInput.value));

//devo ricordarmi che gli event listener accetano callBackl/reference, non posso chimare direttamente la funzione, perchè essa verrebbe eseguita senza aspettare al click

function monthcorousel(){
    const carousel = document.querySelector(".mini-month-btn");
    const monthCaroseul = document.querySelector(".month-lists")
    const months = Array.from({length: 12}, (_, i) => dayjs().month(i).format("MMMM"))
    carousel.addEventListener("click",()=>{
     monthCaroseul.classList.toggle("show-carousel")
    } )
  months.forEach((month, index) =>{
    const el = createElement(monthCaroseul, "mini-month-item", month, "div")
        el.addEventListener("click", () => {
            miniLocalDate = miniLocalDate.month(index);
            syncMiniInputs();
            createMiniCalendar(miniLocalDate);
            monthCaroseul.classList.remove("show-carousel");
        });
    });
}
// function closeMiniCalendar(e){
//     if(!showModal.classList.contains("show-mini-calendar"))return;
//     if(showModal.classList.contains("show-mini-calendar")){
//         //closest contiene anche la classe del carouesello per la scelta del mese
//         if(!showModal.contains(e.target) && !e.target.closest(".big-numbers, .mini-month-item")){
//             setuserDate()
           
//         }
//     }
// }


// document.addEventListener("click", closeMiniCalendar)

function selectDays(e){
    const miniGrid = document.querySelector(".mini-boxes-container")
    if (!miniGrid) return;

    miniGrid.addEventListener("click",(e) => {
        const selectedDay = e.target.dataset.day
        if (!selectedDay) return;
        miniLocalDate = dayjs(selectedDay);
        syncMiniInputs();
        createMiniCalendar(miniLocalDate);
    })
}

export function createMiniCalendar(newDate){
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
     selectDays()
     // actions
    const actionsCont = document.createElement("div");
    actionsCont.classList.add("mini-actions");

    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("mini-cancel-btn");
    cancelBtn.setAttribute("type", "button");
    cancelBtn.innerText = "Annulla";
    cancelBtn.addEventListener("click", cancelMiniCalendar);

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("mini-save-btn");
    saveBtn.setAttribute("type", "button");
    saveBtn.innerText = "Salva";
    saveBtn.addEventListener("click", commitMiniDate);

    actionsCont.appendChild(cancelBtn);
    actionsCont.appendChild(saveBtn);
    div.appendChild(actionsCont);
}
//il return del div mi serve perchè così el viene associato a quel elemento del DOm ovvero il div appunto





// syncMiniInputs()
// createMiniCalendar(overlay.date)
// setuserDate()