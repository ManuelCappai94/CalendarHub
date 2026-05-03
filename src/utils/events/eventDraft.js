import createElement from "../helpers/createElement.js";



const eventContainer = document.querySelector(".event-form")
const firstRow = document.querySelector(".event-description")
const toHourInput = document.querySelector(".input-hour.to");
const toMinuteInput = document.querySelector(".input-minute.to");
const fourthRow = document.querySelector("#row-time")
const dateRow = document.querySelector("#row-date")

export const eventDraft = {
  title: "",
  date: "",
  from: "",
  to: "",
  description: "",
  icon: "✏️",
  color: "blue",
  urgent: false,
  allDay: false,
  repeat: null,
  notification: "5 minuti prima",
}


export const timeDraft = {
        from: { hour: "", minute: "" },
        to: { hour: "", minute: "" }
      };

export function updateEventDraft(field, value){
    // if(!value)return
    eventDraft[field] = value;
}

function createMessage(message, container){
  const positionTop = container.getClientRects()[0].top
  const positionLeft = container.getClientRects()[0].left + 50
  
    const alert = createElement(
      eventContainer,
      "missing-info-alert",
        message,
      "p"
    )
    setTimeout(()=>{
      alert.remove()
    }, 2000)

    const messageContainer = document.querySelector(".missing-info-alert")
    messageContainer.style.top = positionTop + "px"
    messageContainer.style.left = positionLeft + "px"
}

export function validateTimeRange(timeDraft){
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
    createMessage("l'orario di fine deve essere nello stesso giorno", fourthRow)
    timeDraft.to.hour = ""
    timeDraft.to.minute = ""
    updateEventDraft("to", "")
    toHourInput.value = ""
    toMinuteInput.value = ""

    return false
  }
  return true
}


export function validatorEventDraft(){
  if(!eventDraft.title){
    createMessage("inserisci un titolo", firstRow)
    return false
  }
  if (!eventDraft.date) {
  createMessage("seleziona una data", dateRow);
  return false;
}
  if (!eventDraft.allDay) {
    if (!eventDraft.from || !eventDraft.to) {
      createMessage("inserisci entrambi gli orari", fourthRow);
      return false;
    } 
     if (!validateTimeRange(timeDraft)) {
      createMessage("seleziona un orario", fourthRow);
      return false;
    }
  }  else {
  updateEventDraft("from", "00:00")
  updateEventDraft("to", "23:59")
 }
  return true
}



