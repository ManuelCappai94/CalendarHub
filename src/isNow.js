
import globalDate from "./state.js";
const state = globalDate.date

export function isNow(){
    const selectHour = document.querySelectorAll(".day-box");
    let now = state.minute(0).format("HH:mm")
    let today = state.format("YYYY-MM-DD")
    let targetHour = null;

    selectHour.forEach((hour) => {
        // console.log(hour.dataset.time) //cosi accedo al dataset
        if ( hour.dataset.time === now && hour.parentElement.dataset.day === today){
            hour.classList.add("today");
            hour.nextElementSibling.classList.add("today");
            targetHour = hour
        } 
    })
    if (targetHour) {
        targetHour.scrollIntoView({ block: "center", behavior: "smooth" });     
}}

isNow()