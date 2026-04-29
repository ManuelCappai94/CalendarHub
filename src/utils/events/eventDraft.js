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

export function updateEventDraft(field, value){
    // if(!value)return
    eventDraft[field] = value;
}