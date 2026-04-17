const header = document.querySelector(".show-date")
const fromTimeBtn = document.querySelector(".input-time.from")
const toTimeBtn = document.querySelector(".input-time.to")
// console.log(fromTimeBtn)
import dayjs from "../day.js";

console.log(header)

export const getData = (e)=>{
    let date, time;
    if(e.target.classList.contains("box-grid")){
        date = e.target.firstElementChild.dataset.day
        time = dayjs().format("HH:mm")
        return {
            date: date,
            time: time
        }
    } else {
        date =  e.target.parentElement.dataset.day
        time = e.target.dataset.time
        return {
            date: date,
            time: time
        }
    }    
}

export function preCompiler(e){
    // header.firstElementChild = "";
    const {date, time} = getData(e)
    console.log(typeof time)
    const endTime = dayjs(time, "HH:mm").add(1, "hour").format("HH:mm")


    header.firstElementChild.innerHTML = date
    header.firstElementChild.nextElementSibling.innerHTML = time
    fromTimeBtn.placeholder = time
    toTimeBtn.placeholder = endTime
}
