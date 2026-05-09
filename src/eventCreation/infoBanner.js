  import { getEvents, deleteEventFromLocalStorage, saveEventsInLocalStorage } from "../utils/events/eventStorage.js"
  import createElement from "../utils/helpers/createElement.js"
  import getFloatingPosition from "../utils/helpers/floatingPositioner.js";
  import { renderEvents, getAllRenderableEvents } from "../utils/events/eventRendering.js";
  import { createMessage } from "../utils/helpers/createElement.js";
  import { preCompilerEdit } from "./eventLogic.js";
  import { rehydrateRepeatModal } from "./repeatEvent.js";
  import openModal from "./eventModal.js";

  const modalLayer = document.querySelector(".mini-calendar-layer");

  let selectedCurrentID = null
  let colorClass = null

  function handleOptionsClick(e){
      const button = e.target.closest("button[data-action]")
      if (!button) return

       const action = button.dataset.action

       switch(action){
        case "edit-normal":
          handleClickEditButton(e)
          break;
        case "edit-single":
          handleClickEditSingleEventBtn(e)
          break;
        case "edit-series":
          handleClickEditSeriesBtn(e)
          break;
        case "delete-normal":
          deleteEvent()
          break;
        case "delete-single":
          deleteSingleOccurrence()
          break;
        case "delete-series":
           deleteEventsOccurrencies()
          break;
       }
   } 

  export function initOptionsBanner(currentEvent){
 
    const optionsBanner = createElement(
      document.body,
      "option-banner-container",
      null,
      "div"
    )
  
    const close = createElement(optionsBanner, "close-banner", "x", "button")
  
    const infoSection = createElement(
      optionsBanner,
      "info-section",
      null,
      "section",
      {html:true}
    )
    const optionsSection = createElement(
      optionsBanner, 
      "options-section",
      null,
      "section",
      {html:true}
    )
  optionsSection.addEventListener("click", handleOptionsClick)
   
   optionsBanner.querySelector(".close-banner").addEventListener("click", closeInfoBanner);
  }
  
  export function renderExtraInfo(currentEvent, e){
    const banner = document.querySelector(".option-banner-container");
    const infoSection = banner.querySelector(".info-section");
    const optionSection = banner.querySelector(".options-section")
    const events = getAllRenderableEvents()
    const selectedEvent = events.find(event => event.id === currentEvent.dataset.id)
    if(!selectedEvent)return

    const isRepeatedEvent = selectedEvent.repeat !== null || selectedEvent.isOccurrence === true

    // banner.style.background = selectedEvent.color
    banner.classList.add(`event-${selectedEvent.color}`)
    colorClass = selectedEvent.color

    selectedCurrentID = currentEvent.dataset.id

    modalLayer.classList.add("show-mini-calendar-layer");
    banner.classList.add("show-option-banner")

    const rect = e.target.getBoundingClientRect()
    const isDailyview = e.target.closest(".daily-event, .daily-allDay-event")

    getFloatingPosition(banner, rect, isDailyview)
    
    infoSection.innerHTML= `
    <h2>${selectedEvent.title}</h2>
    ${
      selectedEvent.allDay
        ? `<p>Tutto il giorno</p>`
        : `<p>${selectedEvent.from} - ${selectedEvent.to}</p>`
    }
    ${selectedEvent.description ? `<p>${selectedEvent.description}</p>` : ""}
    ${selectedEvent.urgent ? `<p>Urgente!</p>` : ""}
      `;

    if(isRepeatedEvent){
      optionSection.innerHTML=`
      <button 
        class="edit-event-btn" 
        type='button' 
        data-action="edit-single"
      >
        modifica singolo evento
      </button>
      <button 
        class="edit-event-btn" 
        type='button' 
        data-action="edit-series"
      >
        modifica serie
      </button>
      <button 
        class="delete-event-btn" 
        type='button' 
        data-action="delete-single"
      >
        elimina singolo evento
      </button>
      <button 
        class="delete-event-btn" 
        type='button' 
        data-action="delete-series"
      >
        elimina serie
      </button>
      `
    }else{
      optionSection.innerHTML=`
      <button 
      class="edit-event-btn"
       type='button'
       data-action="edit-normal"
       >
       modifica
       </button>
      <button 
      class="delete-event-btn" 
      type='button'
      data-action="delete-normal"
      >
      elimina evento
      </button>`
    }
  }
  
function deleteEvent(){
  const banner = document.querySelector(".option-banner-container");
  
  deleteEventFromLocalStorage(selectedCurrentID)

   createMessage("l'evento è stato rimosso", banner, document.body )
   closeInfoBanner()
   renderEvents()
}
function deleteEventsOccurrencies(){
  const banner = document.querySelector(".option-banner-container");
  const events = getAllRenderableEvents()
 
  const ID = selectedCurrentID;
  const currentEvent = events.find(event => event.id === ID)
  const motherId = currentEvent.originalEventId ?? currentEvent.id 
  
  deleteEventFromLocalStorage(motherId)

   createMessage("la serie è stato rimossa", banner, document.body )
   closeInfoBanner()
   renderEvents()
}

function deleteSingleOccurrence(){
  const banner = document.querySelector(".option-banner-container");
   const ID = selectedCurrentID;
   const events = getAllRenderableEvents()
    const storedEvents = getEvents()
  
   const currentEvent = events.find(event => event.id === ID)
   if(!currentEvent)return

   const occurrenceDate = currentEvent.date
   
    const motherId = currentEvent.originalEventId ?? currentEvent.id

    const updatedEvents = storedEvents.map(event => {
            if (event.id !== motherId) return event
        return {
            ...event,
            repeat: {
                ...event.repeat,
                exceptions: [...event.repeat.exceptions, occurrenceDate]
            }
          }  
        })
        console.log(updatedEvents)
    saveEventsInLocalStorage(updatedEvents)
    createMessage("l'evento è stato rimosso", banner, document.body )
       closeInfoBanner()
   renderEvents()
}


function getEventFromID(){
  const ID = selectedCurrentID;
  const events = getAllRenderableEvents();
  // const localStorageEvents = getEvents()
  const currentEvent = events.find(event => event.id === ID)
  const motherId = currentEvent.originalEventId ?? currentEvent.id
  const motherEvent = events.find(event => event.id === motherId)
  console.log(currentEvent, motherEvent)
  return {
    currentEvent: currentEvent,
    motherEvent: motherEvent
  }
}
  
export function closeInfoBanner(){
  const banner = document.querySelector(".option-banner-container");
  banner.classList.remove(`event-${colorClass}`)
    selectedCurrentID = null
    colorClass = null
  modalLayer.classList.remove("show-mini-calendar-layer")  
  banner.classList.remove("show-option-banner")
}

function handleClickEditButton(e){
 const currentEvent =  getEventFromID().currentEvent
 preCompilerEdit(currentEvent, "edit")
 rehydrateRepeatModal()
 openModal(e)
 closeInfoBanner()
}
function handleClickEditSingleEventBtn(e){
  const currentEvent =  getEventFromID().currentEvent
  preCompilerEdit(currentEvent, "edit-single-occurrence")
  openModal(e)
  closeInfoBanner()
}
function handleClickEditSeriesBtn(e){
   const currentEvent =  getEventFromID().motherEvent
   
    // console.log(currentEvent.id, motherId)
 preCompilerEdit(currentEvent, "edit")
 rehydrateRepeatModal()
 openModal(e)
 closeInfoBanner()
}

export function initExtraInfos(){
  initOptionsBanner()
 }