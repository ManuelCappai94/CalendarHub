  import { getEvents } from "../utils/events/eventStorage.js"
  import createElement from "../utils/helpers/createElement.js"
  import getFloatingPosition from "../utils/helpers/floatingPositioner.js";
  import { renderEvents } from "../utils/events/eventRendering.js";

  const modalOverlay = document.querySelector(".modal-overlay");

  let selectedCurrentID = null

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
      `<button class="edit-event-btn" type='button'>modifica</button>
      <button class="delete-event-btn" type='button'>elimina evento</button>
      `,
      "section",
      {html:true}
    )
    optionsBanner.querySelector(".close-banner").addEventListener("click", closeInfoBanner);
    optionsBanner.querySelector(".delete-event-btn").addEventListener("click", deleteEventFromLocalStorage)
  }
  
  export function renderExtraInfo(currentEvent, e){
    const banner = document.querySelector(".option-banner-container");
    const infoSection = banner.querySelector(".info-section");
    const events = getEvents()
    const selectedEvent = events.find(event => event.id === currentEvent.dataset.id)
    if(!selectedEvent)return

    banner.style.background = selectedEvent.color
    selectedCurrentID = currentEvent.dataset.id

    modalOverlay.classList.add("show-overlay");
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
  }
  
function deleteEventFromLocalStorage(){
  const events = getEvents() 
   const updatedEvents = events.filter(event => event.id !== selectedCurrentID)
   localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
   closeInfoBanner()
   renderEvents()
}
  
export function closeInfoBanner(){
  const banner = document.querySelector(".option-banner-container");
    selectedCurrentID = null
  modalOverlay.classList.remove("show-overlay")  
  banner.classList.remove("show-option-banner")
  console.log(selectedCurrentID)
  
}


  export function initExtraInfos(){
  initOptionsBanner()
 }