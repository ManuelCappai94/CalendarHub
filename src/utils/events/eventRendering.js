import { getEvents } from "./eventStorage.js"
import createElement from "../helpers/createElement.js"
import { separateHourFromMinute, timeToMinutes } from "../helpers/timeHelper.js"
import { getRepeatedEvents } from "../../eventCreation/generateRepeatEvents.js"

export function getAllRenderableEvents() {
  const eventsUpdated = getEvents()
  const eventOccurrencies = getRepeatedEvents()
  return [...eventsUpdated, ...eventOccurrencies]
}


export function renderEvents(){
   const allEvents = getAllRenderableEvents()

   renderMonthEvents(allEvents)
   renderDailyEvents(allEvents)
   renderWeeklyEvents(allEvents)
 
}

function renderMonthEvents(allEvents){
    
    const monthlyBoxes = document.querySelectorAll(".box-grid")

    //ore prando gli eventi generati ripetuti(non sono salvati nel localStorage)
    monthlyBoxes.forEach(box =>{
     const container = box.querySelector(".monthly-events-container")
     const allDayContainer = box.querySelector(".event-allDay-container");
       if (!container || !allDayContainer) return;

       container.innerHTML = "";
       allDayContainer.innerHTML = "";
    
       const dataDay = box.dataset.day;
       const eventOfDay = allEvents.filter( event => event.date === dataDay);
    
       eventOfDay.sort((a, b) => {

        const aTotal = timeToMinutes(a.from)
        const bTotal = timeToMinutes(b.from)

        return aTotal - bTotal
        });
       eventOfDay.forEach(event =>{
  
        if(event.allDay){
          const eventElement = createElement(
           allDayContainer,
           "monthly-event",
           `<span>Oggi:</span> <p>${event.title}</p>`,
           "div",
           {
            html: true,
            dataset: {id: event.id}
           }
          );
         eventElement.classList.add(`event-${event.color}`)
         eventElement.classList.add("render-allDay")
          if(event.urgent){
            eventElement.classList.add("event-urgent")  
          }
        }else{
           const eventElement =  createElement(
            container, 
              `monthly-event`,
              `<span class="icon-month">${event.icon}</span> <span class="title-month">${event.title}</span> `,
              "div",
              {
                html: true,
                dataset: {id: event.id}
              }
            );
    eventElement.classList.add(`event-${event.color}`)
    if(event.urgent){
        eventElement.classList.add("event-urgent")  
    }
    if(event.isOccurrence){
      eventElement.innerHTML=`<span class="icon-month">${event.icon}</span> <span class="title-month">${event.title}</span> <small class="repeat-icon" >🔗</small>  `
    }};
   
    });
    }); 
}

//ogni casella ha un'altezza coerente, ed equivale a 30 minuti, quindi ogni frazione di essa corrispondera ad un minuto
export function renderDailyEvents(allEvents){
    const container = document.querySelector(".day-structure")
    const allDayContainer = document.querySelector(".daily-allDay-container")
    
    container.querySelectorAll(".daily-event").forEach(event => event.remove());
    allDayContainer.querySelectorAll(".daily-allDay-event").forEach(event => event.remove())
    const dailybox = document.querySelector(".day-box")
    const dataDay = dailybox.parentElement.dataset.day
    const height = dailybox.getBoundingClientRect().height
    // const width = dailybox.getBoundingClientRect().width
  renderHelper(
    height,
     container,
      allEvents,
       dataDay,
        "daily-event",
         allDayContainer,
         "daily-allDay-event"
        )
}
export function renderWeeklyEvents(allEvents){
  const containers = document.querySelectorAll(".day-name")
   const allDayContainers = document.querySelectorAll(".week-all-day-container")
   const allDayContainer= [...allDayContainers]
   allDayContainer.forEach(event => event.innerHTML = "")
  containers.forEach((container, index) => {
    container.querySelectorAll(".weekly-event").forEach(event => event.remove());
    
    const weeklyBox = document.querySelector(".week-box")
    const height = weeklyBox.getBoundingClientRect().height
    // const width = weeklyBox.getBoundingClientRect().width
    const dataDay = container.dataset.day
 
    // console.log(height /30)
    renderHelper(
      height,
       container,
        allEvents,
         dataDay,
          "weekly-event",
           allDayContainer[index],
            "week-allDay-event"
           )
  }) 
}



 function renderHelper(
   height,
   container,
   eventsUpdated,
   dataDay,
   eventClass,
   allDayContainer,
   allDayClass
  ){
  const heightXMinute = height /30
    const eventOfDay = eventsUpdated.filter( event => event.date === dataDay)
    const allDayEvents = eventOfDay.filter(event => event.allDay);
    const timedEvents = eventOfDay.filter(event => !event.allDay);

    allDayEvents.forEach( event => {
    
        const eventElement = createElement(
          allDayContainer,
          allDayClass,
           `<span class="all-event-start-text">Oggi:</span> <p><span >${event.icon}</span>${event.title}</p>`,
           "div",
           {
            html: true,
            dataset: {id: event.id}
           }
        )
        eventElement.classList.add(`event-${event.color}`)   
        if(event.urgent){
          eventElement.classList.add("event-urgent")  
        }
      
    })
      timedEvents.forEach(event=>{

        const eventElement = createElement(
          container, 
          eventClass,
          `<span class="render-time">
          ${event.from}
          </span> 
          <p class="render-title">
          <span >${event.icon}</span> ${event.title}
          </p>`,
          "div",
          {
            html: true,
            dataset: {id: event.id}
          }
        )
        const start = timeToMinutes(event.from)
        const end = timeToMinutes(event.to) 
        const top = start * heightXMinute
        const eventHeight = (end - start) * heightXMinute
        
        // console.log("start", start, "end", end)
        const overlaps = timedEvents.filter( other =>{
          const aStart = timeToMinutes(event.from)
          const aEnd = timeToMinutes(event.to)
          const bStart = timeToMinutes(other.from)
          const bEnd = timeToMinutes(other.to) 
          return aStart < bEnd && bStart < aEnd
        })
        
        const overlapIndex = overlaps.findIndex(other =>{
          
          return other.id === event.id
        })
        // console.log(overlapIndex)
        const width = 95 / overlaps.length
        const left = overlapIndex * width
        
        eventElement.classList.add(`event-${event.color}`)     
        eventElement.style.top = `${top}px`
        eventElement.style.height =`${eventHeight}px` 
        eventElement.style.width = `${width}%`
        eventElement.style.left =`${left}%`
        
        if(event.urgent){
          eventElement.classList.add("event-urgent")  
        }
        if(event.isOccurrence){
      eventElement.innerHTML=`<span >${event.icon}</span> <span>${event.title}</span> <small class="repeat-icon-alt" >🔗</small>  `
    }
      })
  }


  
