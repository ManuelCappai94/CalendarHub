
import globalDate from "./state.js";


export function isNow(){
    const selectHour = document.querySelectorAll(".day-box");
    let now = globalDate.minute(0).format("HH:mm")
    let today = globalDate.format("YYYY-MM-DD")
    let targetHour = null;

    selectHour.forEach((hour) => {
        // console.log(hour.dataset.time) //cosi accedo al dataset
        if ( hour.dataset.time === now && hour.parentElement.dataset.day === today){
            hour.classList.add("today");
            hour.nextElementSibling.classList.add("today");
            targetHour = hour
            console.log(targetHour)
        } 
    })
    if (targetHour) {
        targetHour.scrollIntoView({ block: "center", behavior: "smooth" }); //by Chatgpt     
}}

isNow()