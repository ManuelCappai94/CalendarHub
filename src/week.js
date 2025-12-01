import dayjs from "./day.js";
import globalDate from "./state.js";


const weekGrid = document.getElementById("full-week-view");




let currentview = globalDate;

export default function createWeekGrid (currentview) {
    weekGrid.innerHTML= "";

    const div = document.createElement("div");
    div.classList.add("ul-week-time");
    weekGrid.appendChild(div);
    const list = document.createElement("ul");
    list.classList.add("time-week");
    div.appendChild(list);

    for ( let i = 23; i >= 0; i--){ //ho dovuto inveritre la logica, per colpa del css...
        let midnight;
        //qua creo un if per ritornarmi o meno l'orario inglese
        let time = dayjs().hour(i).format("HH");
        time = time + ":00";

       if (i === 0) {
        midnight = "midnight";
       } else {
        midnight = null;
       };
        list.insertAdjacentHTML("afterbegin", `
                    <li class="time-lable ${midnight}">
                        <div class="hour-lable "><span>${time}</span></div> 
                        <div class="half-lable"><span></span></div>
                    </li>
                    ` )
    }; 

    for(let j = 0 ; j < 7; j++){
        let weekNumber, dayClass;
        
        //  weekNumber = parseInt(monday) + j ;
        let firstDayOfWeek = currentview.weekday(j );
        let days = firstDayOfWeek.format("dddd"); 
        let dataDay = firstDayOfWeek.format("YYYY-MM-DD");
        weekNumber = firstDayOfWeek.format("DD");
        let shrinkDays = days.substring(0,3);
        console.log(shrinkDays)
       if (dataDay === globalDate.format("YYYY-MM-DD")){
        dayClass = "is-today"
       } else {
        dayClass = "normal-week"
       }
      weekGrid.insertAdjacentHTML("beforeend", `
                    <div class="week-structure">
                    <ul class="day-name ${dayClass}" data-day=${dataDay}>
                        <li class="week-day-display"> <span class="day-label">${weekNumber} </span> <br><br><span class="day-label-text" data-shrinkDays="${shrinkDays}"> ${days}</span></li>  
                    </ul>
                    </div>`)         
                } 
                ;
   const dayName = document.querySelectorAll(".day-name") // per usare il forEach, ho dovuto creare una nodeList, selezionado per la classe degli elementi creati dal ciclo for qua sopra;

    dayName.forEach((day) => {
    for( let k=0 ; k < 24; k++) {
    let midnight, today;
    let p = 0;
    let dayOfWeek = currentview.weekday(p + 1).hour(k);
    let hour = dayOfWeek.minute(0).format("HH:mm");
    let halfHour = dayOfWeek.minute(30).format("HH:mm");
    if (k === 0) {
        midnight = "midnight-box";
    } else {
        midnight = null;
    };
    day.insertAdjacentHTML("beforeend", `
        <li class="week-box ${midnight}" data-time="${hour}"></li>
        <li class="week-half-box" data-time=${halfHour}></li>
        `)
};
}) 
};


createWeekGrid(currentview)





