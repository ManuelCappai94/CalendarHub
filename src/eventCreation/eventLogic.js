import dayjs from "../day.js";
import { eventDraft } from "../utils/events/eventDraft.js";
import { renderColorList } from "../utils/events/createLists.js";
import { openMiniCalendar } from "../utils/miniCalendar.js";
import { updateEventDraft } from "../utils/events/eventDraft.js";
import { formatDate } from "../utils/events/eventsUI.js";
import createElement from "../utils/helpers/createElement.js";
import createCaroseul from "../utils/events/createLists.js";
import { nowTarget } from "../utils/isNow.js";


const header = document.querySelector(".show-date")

const fromHourInput = document.querySelector(".input-hour.from");
const fromMinuteInput = document.querySelector(".input-minute.from");

const toHourInput = document.querySelector(".input-hour.to");
const toMinuteInput = document.querySelector(".input-minute.to");

const inputTitle = document.querySelector(".input-name")
const inputDesc = document.querySelector(".description-area-text")
const btnDesc = document.querySelector(".btn-description")
const showDesc = document.querySelector(".description-area")
const categoryBtn = document.querySelector("#color-btn")
const colorLists = document.querySelector(".color-list")
const urgentBtn = document.querySelector("#urgent-btn")
const urgentCheckBox = urgentBtn.querySelector(".checkBox");
const miniCalendarBtn = document.querySelector(".mini-calendar-btn")
const allDayBtn = document.getElementById("all-day-btn")
const allDayCheckBox = allDayBtn.querySelector(".checkBox")
const timeSelectionContainer = document.querySelector(".time-selection")
const listedTimeBtnFrom = document.querySelector(".listed-time.from")
const listedTimeBtnTo = document.querySelector(".listed-time.to")
const fourthRow = document.querySelector("#row-time")
const listedTimeFrom = document.querySelector(".interactive-time-list.from")
const listedTimeTo = document.querySelector(".interactive-time-list.to")


// const urgentCheckBox = document.querySelector(".checkBox")
// console.log(urgentCheckBox);




export const getData = (e)=>{
    let date, time;
    if(e.target.classList.contains("box-grid")){
        date = e.target.firstElementChild.dataset.day
        time = dayjs().format("HH:mm")
        return {
            date: date,
            time: time
        }
    } else {
        date =  e.target.parentElement.dataset.day
        time = e.target.dataset.time
        return {
            date: date,
            time: time
        }
    }    
}

function initEventDraft(date, time, endTime ){
  eventDraft.title = "";
  eventDraft.date = date;
  eventDraft.from = time;
  eventDraft.to = endTime;
  eventDraft.description = "";
  eventDraft.icon = "✏️";
  eventDraft.color = "blue";
  eventDraft.urgent = false;
  eventDraft.allDay = false;
  eventDraft.repeat = null;
  eventDraft.notification = "5 minuti prima";
}

export function cleanEventDraft(){
    eventDraft.title = "";
    eventDraft.date = "";
    eventDraft.from = "";
    eventDraft.to = "";
    eventDraft.description = "";
    eventDraft.icon = "✏️";
    eventDraft.color = "blue";
    eventDraft.urgent = false;
    eventDraft.allDay = false;
    eventDraft.repeat = null;
    eventDraft.notification = "5 minuti prima";

    inputTitle.value = ""
    inputDesc.value = "";
    if(colorLists.classList.contains("show-color-list")){
        colorLists.classList.remove("show-color-list")
    }
    colorLists.querySelectorAll(".color").forEach(item => {
        item.classList.remove("color-selected")
    })
    if(urgentCheckBox.classList.contains("checked")){
        urgentCheckBox.classList.remove("checked")
    }
    if(allDayCheckBox.classList.contains("checked")){
        allDayCheckBox.classList.remove("checked")
    }
    fromHourInput.value = ""
    fromMinuteInput.value = ""
    toHourInput.value = ""
    toMinuteInput.value = ""
}



export function preCompiler(e){
    // header.firstElementChild = "";
    let hour, minute, finalHour, finalMinute;
   
    const {date, time} = getData(e)
    const endTime = dayjs(time, "HH:mm").add(1, "hour").format("HH:mm")

    header.firstElementChild.innerHTML = formatDate(date)
    header.firstElementChild.nextElementSibling.innerHTML = time
    // fromTimeBtn.placeholder = time
    // toTimeBtn.placeholder = endTime
    
    hour = time.slice(0, 2)
    minute = time.slice(3, 5)
    finalHour = endTime.slice(0, 2)
    finalMinute = endTime.slice(3, 5)
    
    fromHourInput.placeholder = hour
    fromMinuteInput.placeholder = minute

    toHourInput.placeholder = finalHour
    toMinuteInput.placeholder = finalMinute

    initEventDraft(date, time, endTime)
    console.log(eventDraft)
}

function updateTimeInput(part, value){
    const num = parseInt(value)

    if(isNaN(num)) return

    switch(part){
        case "hour":
            if(num < 0 || num > 23) return;
            return String(num).padStart(2, "0")
            break;
        case "minute":
            if(num < 0 || num >= 60) return
            return String(num).padStart(2, "0")
            break;
    }
}
function inputTimeHelper(timeDraft, caseType, input, classType){
    const time = updateTimeInput(caseType, input.value)
         if(time === undefined){
            input.value = "";
            return
         }
         timeDraft[classType][caseType] = time
         console.log(time)

         const current = timeDraft[classType]
         if(current.hour !== "" && current.minute !== ""){
            const finalTime = `${current.hour}:${current.minute}`
            updateEventDraft(classType, finalTime)
         }
}

function validateTimeRange(timeDraft){
  const from = timeDraft.from;
  const to = timeDraft.to;

  if(
    from.hour === "" ||
    from.minute === "" ||
    to.hour === "" ||
    to.minute === ""
    )return false;
  //Number ritorna il numero dalla stringa, moltiplico l'ora per 60, cosi da normalizzare l'unità di misura in minuti, perchè se no sarebbe come confrontare pere con banane 
  const fromMinutes = Number(from.hour) * 60 + Number(from.minute)
  const toMinutes = Number(to.hour) * 60 + Number(to.minute)

  if(fromMinutes >= toMinutes){
    const alert = createElement(fourthRow, "wrong-time-alert", "orario selezionato non valido", "p")
    setTimeout(()=>{
        alert.remove();
    }, 2000)
    timeDraft.to.hour = ""
    timeDraft.to.minute = ""
    updateEventDraft("to", "")
    toHourInput.value = ""
    toMinuteInput.value = ""

    return false
  }
  return true
}

function inputTimeReader(timeDraft){
    fromHourInput.addEventListener("change", ()=>{
        inputTimeHelper(timeDraft, "hour", fromHourInput, "from")
    })
    fromMinuteInput.addEventListener("change", ()=>{
        inputTimeHelper(timeDraft, "minute", fromMinuteInput, "from")
    })
    toHourInput.addEventListener("change", ()=>{
        inputTimeHelper(timeDraft, "hour", toHourInput, "to")
        validateTimeRange(timeDraft)
    })
    toMinuteInput.addEventListener("change", ()=>{
        inputTimeHelper(timeDraft, "minute", toMinuteInput, "to")
        validateTimeRange(timeDraft)
    })
    
}

function applySelectedTime(timeDraft, type, time){
    const hour = time.slice(0, 2)
    const minute = time.slice(3, 5)

    if(type === "from"){
        fromHourInput.value = hour
        fromMinuteInput.value = minute
    }
      if (type === "to") {
        toHourInput.value = hour;
        toMinuteInput.value = minute;
    }

    timeDraft[type].hour = hour;
    timeDraft[type].minute = minute;

    updateEventDraft(type, time);
}

export function eventFiller(){
    let title, desc;

    const timeDraft = {
        from: { hour: "", minute: "" },
        to: { hour: "", minute: "" }
        };

    renderColorList()
       //fa solo il render, meglio farlo una sola volta
    createCaroseul()

    btnDesc.addEventListener("click", ()=>{
        showDesc.classList.toggle("show-desc-area")
    })

    inputTitle.addEventListener("change", ()=>{
        title = inputTitle.value
        updateEventDraft("title", title)
    })
    inputDesc.addEventListener("change", ()=>{
         desc = inputDesc.value
         updateEventDraft("description", desc)
         console.log(eventDraft)
    })
    categoryBtn.addEventListener("click", ()=>{
        colorLists.classList.toggle("show-color-list")
    })

    colorLists.addEventListener("click", (e)=>{
        const li = e.target.closest(".color")
        if(!li)return;
        colorLists.querySelectorAll(".color").forEach(item =>{
            item.classList.remove("color-selected")
        });
        li.classList.add("color-selected")
        updateEventDraft("color", li.dataset.color)
    })

    urgentBtn.addEventListener("click", ()=>{
        const isChecked = urgentCheckBox.classList.toggle("checked");
        updateEventDraft("urgent", isChecked);
    })

    miniCalendarBtn.addEventListener("click",()=> openMiniCalendar("event"))

    allDayBtn.addEventListener("click", ()=>{
        const isChecked = allDayCheckBox.classList.toggle("checked")
        updateEventDraft("allDay", isChecked)
        if(isChecked){
            timeSelectionContainer.classList.add("hide-time-section")
        } else {
            timeSelectionContainer.classList.remove("hide-time-section")
        }
    })

    inputTimeReader(timeDraft)
  
    listedTimeBtnFrom.addEventListener("click", ()=>{
        listedTimeFrom.classList.toggle("show-menù")
    })
    listedTimeBtnTo.addEventListener("click", ()=>{
        listedTimeTo.classList.toggle("show-menù")
    })
    
    listedTimeFrom.addEventListener("click", (e) => {
        const li = e.target.closest(".list-item");
        if (!li) return;
        listedTimeFrom.classList.remove("show-menù");

     applySelectedTime(timeDraft, "from", li.dataset.time)
     validateTimeRange(timeDraft)
    });
    listedTimeTo.addEventListener("click", (e) => {
        const li = e.target.closest(".list-item");
        if (!li) return;

        listedTimeTo.classList.remove("show-menù");
    applySelectedTime(timeDraft, "to", li.dataset.time);
    validateTimeRange(timeDraft)
    });

    console.log(timeDraft)


}

