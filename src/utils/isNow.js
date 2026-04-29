
import dayjs from "../day.js";

export function nowTarget(target, type){
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
    const weekTargetBox = document.querySelector(".week-box")
    const  targetWeekDay = document.querySelector(".day-name.is-today")
    const container = document.querySelector("#full-week-view");
   
    
  const targetDay =  nowTarget(selectHourDaily, "day")
  const targetHourWeek = nowTarget(selectHourWeek)

  

    if (targetDay) {
        targetDay.scrollIntoView({ block: "center", behavior: "smooth" });     
    }
 
    // window.scrollTo({
    //     top: targetHourWeek.getBoundingClientRect().top + window.scrollY - 120,
    //     behavior: "auto"
    //     });

    container.scrollTo({
        left: targetWeekDay.offsetLeft - container.clientWidth / 2 + weekTargetBox.clientWidth/2,
        behavior: "smooth"
    })

  
}

