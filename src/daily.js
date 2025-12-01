import dayjs from "./day.js";
import globalDate from "./state.js";

const dayGrid = document.getElementById("full-day-view");

let currentview = globalDate;

function createDailyGrid(currentview){
    dayGrid.innerHTML = "";

    let dataDay = currentview.format("YYYY-MM-DD");
    const div = document.createElement("div");
    div.classList.add("ul-day-time");
    dayGrid.appendChild(div);
    const list = document.createElement("ul");
    list.classList.add("day-list");
    div.appendChild(list);

    for(let i=23; i >=0; i--){
        let time = dayjs().hour(i).format("HH");
        time = time + ":00";

        list.insertAdjacentHTML("afterbegin", `
          <li class="time-lable-day">
                        <div class="hour-lable-day"><span>${time}</span></div> 
                        <div class="half-lable-day"><span></span></div>
                    </li>
            `)
    }
   const dayStructure = document.createElement("div");
   dayStructure.classList.add("day-structure");
   dayGrid.appendChild(dayStructure);

   dayStructure.insertAdjacentHTML("afterbegin", `
    <ul class="daily-name" data-day=${dataDay}> </ul>
    `)
    const dailyName = document.querySelector(".daily-name")

   for(let j=23; j>=0; j--){
    
    let dataTime = currentview.hour(j);
    let hour = dataTime.minute(0).format("HH:mm");
    let halfHour = dataTime.minute(30).format("HH:mm");
    let dayClass;
    if(j === 0){
        dayClass = "first"
    } else {
        dayClass = null;
    }
    dailyName.insertAdjacentHTML("afterbegin", `
        
                    <li class="day-box ${dayClass}" data-time=${hour}> 
                    </li>
                    <li class="day-half-box" data-time=${halfHour}> 
                    </li> 
                
        `)
   }
}

createDailyGrid(currentview)

export default createDailyGrid ;