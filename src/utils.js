import createMonthGrid from "./month.js";
import createWeekGrid from "./week.js";
import createDailyGrid from "./daily.js";
import globalDate from "./state.js";
import { isNow } from "./isNow.js";
import dayjs from "./day.js";

const grid = document.querySelector(".month-structure");
const weekGrid = document.getElementById("full-week-view");
const dayGrid = document.getElementById("full-day-view");


        

// console.log(highLightMonth)


const currentMonthDisplay = document.querySelector(".big-numbers.text") ;
const currentYearDisplay = document.querySelector(".big-numbers.year");
const displayOverlayWeek = document.querySelector(".display-overlay.week") ;
const displayOverlayDay = document.querySelector(".display-overlay.day");
/////month-overlay
const leftArrowMonth = currentMonthDisplay.previousElementSibling;
const rightArrowMonth = currentMonthDisplay.nextElementSibling;
///////week-overlay /////////
const currentWeekDisplay = displayOverlayWeek.firstElementChild.nextElementSibling
const leftArrowWeek = displayOverlayWeek.firstElementChild;
const rightArrowWeek = currentWeekDisplay.nextElementSibling;
///// daily-overlay //////////////////
const currentDailyDisplay = displayOverlayDay.firstElementChild.nextElementSibling;
const leftArrowDay = displayOverlayDay.firstElementChild;
const rightArrowDay = currentDailyDisplay.nextElementSibling;






class CalendarLogic {
    constructor () {
        
        this.date = globalDate;
        this.currentMonth = this.date.month() +1;
        this.currentWeek = this.date.isoWeek();
        this.firstOfWeek = this.date.weekday(1);
        this.year = this.date.year();
        this.showedMonth = this.currentMonth - 1;  
        this.dayOfYear = this.date.dayOfYear() ;     
    }
    updateOverlayDisplay(){
        const displayMonth = this.date.month(this.date.month()).format("MMMM");
        const monday = this.date.weekday(0).format("DD MMMM");
        const sunday = this.date.weekday(6).format("DD MMMM");
        const showDailyDate = this.date.format("dddd, DD MMMM");
        const year = this.date.year();
        currentMonthDisplay.innerHTML=`${displayMonth}`; 
        currentWeekDisplay.innerText =`${monday} - ${sunday}`
        currentDailyDisplay.innerHTML=`${showDailyDate}`
        currentYearDisplay.innerHTML= `${year}`;
    }
    nextMonth(){
        
        // this.currentMonth = this.date.month() +1;
        this.showedMonth++;
        this.date = this.date.add(1, "month");
        if(this.showedMonth > 12){
            this.showedMonth= 1;
            this.year++;
        }
        createMonthGrid(this.date);
        createWeekGrid(this.date);
        createDailyGrid(this.date)
        isNow()
    }
    prevMonth(){
        this.showedMonth--;
        this.date = this.date.subtract(1, "month");
        if (this.showedMonth < 1){
            this.showedMonth = 12;
            this.year--;
       }
        createMonthGrid(this.date);
        createWeekGrid(this.date);
        createDailyGrid(this.date)
        isNow()
    }
    prevWeek(){
        this.date = this.date.subtract(1, "week");
        this.currentWeek--; //scendo iso per calcolo anno
        if(this.currentWeek < 1){
            this.year--;
        }
        createMonthGrid(this.date);
        createWeekGrid(this.date);
        createDailyGrid(this.date)
        isNow()
    }
    nextWeek(){
        this.date = this.date.add(1, "week");
        this.currentWeek++; 
        if(this.currentWeek > 52){
            this.year++;
        }
        createMonthGrid(this.date);
        createWeekGrid(this.date); 
        createDailyGrid(this.date)
        isNow()
    }
    prevDay(){
        this.date = this.date.subtract(1, "day");
        
        this.dayOfYear--;
        if(this.dayOfYear < 1){
            this.dayOfYear = 365;
            this.year--;
        }
        createMonthGrid(this.date)
        createWeekGrid(this.date)
        createDailyGrid(this.date)
        isNow()
    }
    nextDay(){
        this.date = this.date.add(1, "day");
        // this.firstOfWeek = this.date.weekday(1);
        this.dayOfYear++;
        if(this.dayOfYear > 365){
            this.dayOfYear = 1;
            this.year++;
        }
        createMonthGrid(this.date)
        createWeekGrid(this.date)
        createDailyGrid(this.date)  
        isNow()
    }
    selectedBoxMonth(){
        createWeekGrid(this.date)
       const highLight = document.querySelectorAll(".day-name");
       highLight.forEach((day)=> {
            const box = day.querySelectorAll(".week-box"); 
            const halfbox = day.querySelectorAll(".week-half-box");
        if (day.dataset.day === this.date.format("YYYY-MM-DD") ){
            box.forEach(child => child.classList.add("selected-week"));
            halfbox.forEach(child => child.classList.add("selected-week"));
        } 
       }) 
       
        createDailyGrid(this.date)
    }
    selectedBoxWeek(){
        createMonthGrid(this.date)
         const allBoxes = document.querySelectorAll(".week-box, .week-half-box");
            allBoxes.forEach(box => {
                box.classList.remove("selected-week");
  });
        const highLight = document.querySelectorAll(".box-grid")
        highLight.forEach((box)=> {
            if(box.firstElementChild.dataset.day === this.date.format("YYYY-MM-DD")){
                box.classList.add("selected")
            }
        })
        createDailyGrid(this.date) 
    }
    setectedBoxDaily(){
        createMonthGrid(this.date)
        createWeekGrid(this.date)
        
        const highLight = document.querySelectorAll(".box-grid")
        highLight.forEach((box)=> {
            if(box.firstElementChild.dataset.day === this.date.format("YYYY-MM-DD")){
                box.classList.add("selected")
            }
        });
        const highLightWeek = document.querySelectorAll(".day-name");
            highLightWeek.forEach((day)=> {
            const box = day.querySelectorAll(".week-box"); 
            const halfbox = day.querySelectorAll(".week-half-box");
        if (day.dataset.day === this.date.format("YYYY-MM-DD") ){
            box.forEach(child => child.classList.add("selected-week"));
            halfbox.forEach(child => child.classList.add("selected-week"));
        } 
       }) 

    }
  
}


const overlay = new CalendarLogic

//devo usare overlay, per evocare il this a cui fa riferimento, perchè ho storato la classe nella costante overlay;
const displayMonth = overlay.date.month(overlay.showedMonth).format("MMMM");
const currentMonday = overlay.date.weekday(0).format("DD MMMM");
const currentSunday = overlay.date.weekday(6).format("DD MMMM");
const showDailyDate = overlay.date.format("dddd, DD MMMM");
const year = overlay.year;

currentMonthDisplay.innerHTML=`${displayMonth}`;
currentWeekDisplay.innerText =`${currentMonday} - ${currentSunday}`
currentDailyDisplay.innerHTML=`${showDailyDate}`
currentYearDisplay.innerHTML= `${year}`;


console.log(overlay)

rightArrowMonth.addEventListener("click", () => {
    overlay.nextMonth();
    overlay.updateOverlayDisplay();
})

leftArrowMonth.addEventListener("click", () =>{
    overlay.prevMonth();
    overlay.updateOverlayDisplay()
})

leftArrowWeek.addEventListener("click", () => {
    overlay.prevWeek();
    overlay.updateOverlayDisplay();
})

rightArrowWeek.addEventListener("click", () => {
    overlay.nextWeek();
    overlay.updateOverlayDisplay();
})

leftArrowDay.addEventListener("click", () => {
    overlay.prevDay();
    overlay.updateOverlayDisplay();
    overlay.setectedBoxDaily();

})
    
rightArrowDay.addEventListener("click", () =>{
    overlay.nextDay();
    overlay.updateOverlayDisplay();
    overlay.setectedBoxDaily()
})



///click sul mese
function highightDayMonth(e) {
    
    // prendo SEMPRE la cella vera, non il target interno
    const cell = e.target.closest(".set, .offset");
    if (!cell) return;

    // tolgo la selezione precedente
    const celleSelezionate = grid.querySelectorAll(".selected");
    celleSelezionate.forEach(cell => cell.classList.remove("selected"));

    // seleziono la cella
    cell.classList.add("selected");

    // prendo la data corretta
    const test = cell.firstElementChild.dataset.day;
    overlay.date = dayjs(test)
    
    overlay.selectedBoxMonth()
    overlay.updateOverlayDisplay()
   
    
}



//click sulla settimana
function highightDayWeek (e){
    const selectday = document.querySelectorAll(".day-name");
    const selecthour = document.querySelectorAll(".week-box");
    const selectHalfhour = document.querySelectorAll(".week-half-box")

    selectday.forEach( cell => cell.classList.remove("selected-week"));
    selecthour.forEach( cell => cell.classList.remove("selected-time"));
    selectHalfhour.forEach( cell => cell.classList.remove("selected-time"));
    
    const box = e.target.closest(".week-box, .week-half-box");

        // SE non ho cliccato una box valida → esco subito
        if (!box) return;

    if (!e.target.classList.contains("week-day-display")){
        e.target.classList.add("selected-time");
    }
    
    if( e.target.classList.contains("week-box")) {
    e.target.nextElementSibling.classList.add("selected-time")   
    } else if (e.target.classList.contains("week-half-box")){
        e.target.previousElementSibling.classList.add("selected-time")
    }
    e.target.parentElement.classList.add("selected-week");
    let highLight = e.target.parentElement.dataset.day
    overlay.date = dayjs(`${highLight}`)
    overlay.selectedBoxWeek()
    overlay.updateOverlayDisplay();
   
}

  
//click sul giorno

function highightDayDaily (e){
const selectHour = document.querySelectorAll(".day-box");
    const selectHalfhour = document.querySelectorAll(".day-half-box");

    selectHour.forEach( cell => cell.classList.remove("selected-time"))
    selectHalfhour.forEach( cell => cell.classList.remove("selected-time"))

    if( e.target.classList.contains("day-box")) {
    e.target.nextElementSibling.classList.add("selected-time")   
    } else if (e.target.classList.contains("day-half-box")){
        e.target.previousElementSibling.classList.add("selected-time")
    }
 e.target.classList.add("selected-time");
};


grid.addEventListener("click", highightDayMonth)
weekGrid.addEventListener("click", highightDayWeek)
dayGrid.addEventListener("click", highightDayDaily)