import dayjs from "../day.js";
import { eventDraft, validateTimeRange, timeDraft } from "../utils/events/eventDraft.js";
import { renderColorList, renderNotificationList } from "../utils/events/createLists.js";
import { openMiniCalendar } from "../utils/miniCalendar.js";
import { updateEventDraft, validatorEventDraft } from "../utils/events/eventDraft.js";
import { formatDate } from "../utils/events/eventsUI.js";
import createElement from "../utils/helpers/createElement.js";
import createCaroseul from "../utils/events/createLists.js";
import { nowTarget } from "../utils/isNow.js"
import { renderEvents } from "../utils/events/eventRendering.js";
import { getEvents } from "../utils/events/eventStorage.js";





const modalEvents = document.querySelector(".event-container")
const modalOverlay = document.querySelector(".modal-overlay");

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
const colorPreview = document.querySelector(".color-preview")
const urgentBtn = document.querySelector("#urgent-btn")
const urgentCheckBox = urgentBtn.querySelector(".checkBox");
const miniCalendarBtn = document.querySelector(".mini-calendar-btn")
const allDayBtn = document.getElementById("all-day-btn")
const allDayCheckBox = allDayBtn.querySelector(".checkBox")
const timeSelectionContainer = document.querySelector(".time-selection")
const listedTimeBtnFrom = document.querySelector(".listed-time.from")
const listedTimeBtnTo = document.querySelector(".listed-time.to")
const listedTimeFrom = document.querySelector(".interactive-time-list.from")
const listedTimeTo = document.querySelector(".interactive-time-list.to")
const repeatBtn = document.querySelector(".event-repeat-btn")
const repeatModal = document.querySelector(".modal-repeat")
const notificationBtn = document.querySelector(".notification-button")
const notificationList = document.querySelector(".notification-list")
const saveBtn = document.getElementById("save-event")
const closeBtn = document.querySelector(".close-btn")

// const urgentCheckBox = document.querySelector(".checkBox")
// console.log(urgentCheckBox);




export const getData = (e)=>{
    let date, time;
    if(e.target.classList.contains("box-grid")){
        date = e.target.firstElementChild.dataset.day
        time = dayjs().minute(0).format("HH:mm")
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

//da spostare initEventDraft e cleanEventDraft in EventDraft.js

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
    colorPreview.style.backgroundColor = "blue"
    if(urgentCheckBox.classList.contains("checked")){
        urgentCheckBox.classList.remove("checked")
    }
    if(allDayCheckBox.classList.contains("checked")){
        allDayCheckBox.classList.remove("checked")
        timeSelectionContainer.classList.remove("hide-time-section")
    }
    fromHourInput.value = ""
    fromMinuteInput.value = ""
    toHourInput.value = ""
    toMinuteInput.value = ""
    if(notificationList.classList.contains("show-container")){
        notificationList.classList.remove("show-container")
    }
    notificationList.style.left = ""

    timeDraft.from.hour = "";
    timeDraft.from.minute = "";
    timeDraft.to.hour = "";
    timeDraft.to.minute = "";
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

    timeDraft.from.hour = hour;
    timeDraft.from.minute = minute;
    timeDraft.to.hour = finalHour;
    timeDraft.to.minute = finalMinute;
    
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

function closeModal(){
   
    modalOverlay.classList.remove("show-overlay");
    modalEvents.classList.remove("show-container")
    
    modalEvents.style.top = "";
    modalEvents.style.left = "";
    cleanEventDraft()
}

export function saveEvent(){
  const isValid = validatorEventDraft()
  if(!isValid){
    return
  } else {
    const newEvent = {
      id: crypto.randomUUID(),
      ...eventDraft
    }
  
    const events = getEvents()

    events.push(newEvent)

    localStorage.setItem("calendarEvents", JSON.stringify(events))
    closeModal()
  }
}


export function initEventFormEvents(){
    let title, desc;
 
    renderColorList()
    renderNotificationList()
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
        colorPreview.style.backgroundColor = `${li.dataset.color}`
        updateEventDraft("color", li.dataset.color)
        colorLists.classList.remove("show-color-list")
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
  
    listedTimeBtnFrom.addEventListener("click", (e)=>{
       const isOpen = listedTimeFrom.classList.toggle("show-menù")

       if(isOpen){
        const targetTime = eventDraft.from
            const target = nowTarget(
                listedTimeFrom.querySelectorAll(".list-item"),
                null,
                "cellTime",
                targetTime
            );
        target?.scrollIntoView({block: "center", behavior: "auto"})
       
       }
    })
    listedTimeBtnTo.addEventListener("click", ()=>{
        const isOpen = listedTimeTo.classList.toggle("show-menù")

        if(isOpen){
         const targetTime = eventDraft.to
            const target = nowTarget(
                listedTimeTo.querySelectorAll(".list-item"),
                null,
                "cellTime",
                targetTime
            );
        target?.scrollIntoView({block: "center", behavior: "auto"})
        
       }
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

    repeatBtn.addEventListener(("click"), ()=>{
        repeatModal.classList.toggle("show-repeat-modal")
    })

    notificationBtn.addEventListener("click", ()=>{
        const position = notificationBtn.getClientRects()[0].right
        notificationList.style.left = position + "px"
        notificationList.classList.toggle("show-container")
        
    })

    notificationList.addEventListener("click", (e)=>{
        const li = e.target.closest(".single-notification")
        if(!li) return;
        updateEventDraft("notification", li.innerText)
        notificationBtn.innerText = li.innerText
        notificationList.classList.remove("show-container")
        
    })

    saveBtn.addEventListener("click", ()=>{
        saveEvent()
        renderEvents()
        
    })


    closeBtn.addEventListener("click", () =>{
        closeModal()
        })
}

export function initEventModal(){
    initEventFormEvents()
}