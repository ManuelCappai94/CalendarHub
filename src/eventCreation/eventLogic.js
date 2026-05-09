import dayjs from "../day.js";
import { eventDraft, validateTimeRange, timeDraft, initEventDraft, resetEventDraft} from "../utils/events/eventDraft.js";
import { renderColorList, renderNotificationList } from "../utils/events/createLists.js";
import { openMiniCalendar } from "../utils/miniCalendar.js";
import { updateEventDraft, validatorEventDraft } from "../utils/events/eventDraft.js";
import { formatDate } from "../utils/events/eventsUI.js";
import createElement from "../utils/helpers/createElement.js";
import createCaroseul from "../utils/events/createLists.js";
import { createMessage } from "../utils/helpers/createElement.js";
import { nowTarget } from "../utils/isNow.js"
import { renderEvents } from "../utils/events/eventRendering.js";
import { getEvents, saveEventsInLocalStorage } from "../utils/events/eventStorage.js";
import { separateHourFromMinute, setTimeUIAndDraft} from "../utils/helpers/timeHelper.js";
import openModal from "./eventModal.js";
import { initRepeatEvents, forceResetRepeatModalState } from "./repeatEvent.js";
import handleListSelection from "../utils/helpers/listSelection.js";

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

let formMode = "create";
let editingEventId = null;
let editingMotherEventId = null
let editingOccurrenceDate = null

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



export function resetEventModal(){
    formMode = "create";
    editingEventId = null;
    editingMotherEventId = null;
    editingOccurrenceDate = null;

    resetEventDraft()
 
    inputTitle.value = ""
    inputDesc.value = "";

    if(colorLists.classList.contains("show-color-list")){
        colorLists.classList.remove("show-color-list")
    }

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
    notificationBtn.innerText = "5 minuti prima"
    timeDraft.from.hour = "";
    timeDraft.from.minute = "";
    timeDraft.to.hour = "";
    timeDraft.to.minute = "";

    }



export function preCompiler(e){
    const {date, time} = getData(e)
    const endTime = dayjs(time, "HH:mm").add(1, "hour").format("HH:mm")

    header.firstElementChild.innerHTML = formatDate(date)
    header.firstElementChild.dataset.day = date
    header.firstElementChild.nextElementSibling.innerHTML = time

     setTimeUIAndDraft(timeDraft, "from", time)
     setTimeUIAndDraft(timeDraft, "to", endTime)
    
    initEventDraft(date, time, endTime)
}

export function preCompilerEdit(event, mode){
     formMode = mode;
 
    Object.entries(event).forEach(([key, value]) =>{
        if(key === "id" || key === "isOccurrence" || key === "seriesId" || key === "originalEventId") return
        eventDraft[key] = value
    })
    editingEventId = event.id  

    if(mode === "edit-single-occurrence"){
        editingEventId = null;
        editingMotherEventId = event.originalEventId ? event.originalEventId : event.id;
        editingOccurrenceDate = event.date;
        eventDraft.repeat = null;
        console.log(editingMotherEventId, editingOccurrenceDate)
    }
   
    header.firstElementChild.innerHTML = formatDate(event.date)
    header.firstElementChild.dataset.day = event.date  //risolve il miniCalendario data iniziale
    header.firstElementChild.nextElementSibling.innerHTML = event.from

    inputTitle.value = event.title;
    inputDesc.value = event.description

    colorPreview.style.backgroundColor = `${event.color}`

    if(event.urgent){
        urgentCheckBox.classList.add("checked")
    }
    if(event.allDay){
        allDayCheckBox.classList.add("checked")
        timeSelectionContainer.classList.add("hide-time-section")
    }
    setTimeUIAndDraft(timeDraft, "from", event.from )
    setTimeUIAndDraft(timeDraft, "to", event.to )

    notificationBtn.innerText = event.notification
    console.log(eventDraft, editingEventId)
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
    setTimeUIAndDraft(timeDraft, type, time)
    updateEventDraft(type, time);
}

function closeModal(){
    modalOverlay.classList.remove("show-overlay");
    modalEvents.classList.remove("show-container")
    
    modalEvents.style.top = "";
    modalEvents.style.left = "";

    forceResetRepeatModalState()
    resetEventModal()
}

export function saveEvent(){

  const isValid = validatorEventDraft()
  if(!isValid){
    return
  } else {
  const events = getEvents()

    switch (formMode) {
      case "create": {
        const newEvent = {
          id: crypto.randomUUID(),
          ...eventDraft
        }

        events.push(newEvent)
        console.log(newEvent)
        saveEventsInLocalStorage(events)
        break
      }

      case "edit": {
        const updatedEvents = events.map(event => {
          return event.id === editingEventId
            ? { id: editingEventId, ...eventDraft }
            : event
        })

        saveEventsInLocalStorage(updatedEvents)
        createMessage("l'evento è stato modificato!", modalEvents, document.body)
        break
      }
      case "edit-single-occurrence": {
        const updatedEvents = events.map(event => {
            if (event.id !== editingMotherEventId) return event
        return {
            ...event,
            repeat: {
                ...event.repeat,
                exceptions: [...event.repeat.exceptions, editingOccurrenceDate]
            }
          }  
        })
        const newEvent = {
          id: crypto.randomUUID(),
          ...eventDraft
        }
        console.log(updatedEvents, newEvent)
        updatedEvents.push(newEvent)
        saveEventsInLocalStorage(updatedEvents)
         createMessage("l'occorrenza è stata modificata!", modalEvents, document.body)
         break
      }
    }

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

    handleListSelection(
        colorLists,
        ".color",
        (li) => {
            colorPreview.style.backgroundColor = li.dataset.color
            updateEventDraft("color", li.dataset.color)
        },
        "show-color-list"
    )

    urgentBtn.addEventListener("click", ()=>{
        const isChecked = urgentCheckBox.classList.toggle("checked");
        updateEventDraft("urgent", isChecked);
    })

    miniCalendarBtn.addEventListener("click",()=> {
        const date = header.firstElementChild.dataset.day
        
        openMiniCalendar("event", date, "event-date")
    })

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

    handleListSelection(
        listedTimeFrom,
         ".list-item",
        (li)=>{
        applySelectedTime(timeDraft, "from", li.dataset.time)
        validateTimeRange(timeDraft)
        },
        "show-menù"
      )
    handleListSelection(
        listedTimeTo,
        ".list-item",
        (li)=>{
            applySelectedTime(timeDraft, "to", li.dataset.time);
            validateTimeRange(timeDraft)
        },
        "show-menù"
    )

    repeatBtn.addEventListener(("click"), ()=>{
        repeatModal.classList.toggle("show-repeat-modal")
    })

    notificationBtn.addEventListener("click", ()=>{
        const position = notificationBtn.getClientRects()[0].right
        notificationList.style.left = position + "px"
        notificationList.classList.toggle("show-container")
        
    })

    handleListSelection(
    notificationList,
        ".single-notification",
        (li) => {
            updateEventDraft("notification", li.innerText)
            notificationBtn.innerText = li.innerText
        },
        "show-container"
    )

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
    initRepeatEvents()
}

export function handleOpenCreate(e){
  preCompiler(e)
  openModal(e)
}