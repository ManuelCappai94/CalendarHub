import createElement from "../helpers/createElement.js";

const header = document.querySelector(".show-date");

//questa funzione avrà acnhe il compito di cambiare il formato mostrato nel modulo eventi in ue/usa
export function formatDate(date){
 let year, month, day;

    year = date.slice(0, 4)
    month = date.slice(5, 7)
    day = date.slice(8, 10)
   return `${day}/${month}/${year}`
}

export function updateEventDateUI(date) {
   
  header.firstElementChild.textContent =  formatDate(date);
}

