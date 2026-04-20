
import dayjs from "../day.js";

function nowTarget(target, type){
    let now = dayjs().minute(0).format("HH:mm")
    let targetHour = null;
        target.forEach((hour) => {
        // console.log(hour.dataset.time) //cosi accedo al dataset
        if ( hour.dataset.time === now ){
            if(type === "day"){
                hour.classList.add("today");
                hour.nextElementSibling.classList.add("today");
            }
            targetHour = hour
        } 

    })
    return targetHour
}

export function isNow(){
    const selectHourDaily = document.querySelectorAll(".day-box");
    const selectHourWeek = document.querySelectorAll(".week-box");
    
//   nowTarget(selectHourDaily)
  const test =  nowTarget(selectHourDaily, "day")
  const targetWeek = nowTarget(selectHourWeek)

    if (test) {
        test.scrollIntoView({ block: "center", behavior: "smooth" });     
    }
    if (targetWeek){
        targetWeek.scrollIntoView({ block: "center", behavior: "smooth" })
    }
}

