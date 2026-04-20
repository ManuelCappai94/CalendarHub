import createMonthGrid from "./month.js";
import createWeekGrid from "./week.js";
import createDailyGrid from "./daily.js";
import globalDate from "./state.js";
import { isNow } from "./utils/isNow.js";
import dayjs from "./day.js";
import { config } from "./utils/config/config.js";
import openModal from "./eventCreation/eventModal.js";
import { theme } from "./utils/theme.js";

const grid = document.querySelector(".month-structure");
const weekGrid = document.getElementById("full-week-view");
const dayGrid = document.getElementById("full-day-view");
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
const modalEvents = document.querySelector(".event-container")


 class CalendarLogic {
    constructor () {
        this.state = globalDate
        this.date = globalDate.date;
        this.currentMonth = this.date.month() +1;
        this.currentWeek = this.date.isoWeek();
        this.firstOfWeek = this.date.weekday(1);
        this.year = this.date.year();
        this.showedMonth = this.currentMonth - 1;  
        this.dayOfYear = this.date.dayOfYear() ;    
    }
    //qui accedo all'oggetto usiamo lo stesso argomento da passare al metodo setDate di questa classe, e al metodo globaldate, la nuova data sarà decisa dal valore che passeremo come argomento che modifica entrambi, questa ora la passo a miniCalendar
    setDate(newDate){
        this.state.setDate(newDate)
        this.date = this.state.date
        this.syncAll()
    };
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
//questo metodo wrappa tutte le funzioni
    syncAll(e){
        createMonthGrid(this.date, grid, config.main);
        createWeekGrid(this.date);
        createDailyGrid(this.date);
        this.updateOverlayDisplay();
        this.highLightDayinMonth()
        this.highLightDay()
        // isNow()  
        theme(this.date)
    }
///sto pensando di fare un refactor grosso ai bottoni, ora mi sono accorto che posso gestire la logica passando dei parametri nei punti giusti, ma richede un refactor strutturale dei bottoni, solo 2 e non 6, e cio che dovrebbe cambiare è solo l'overlay all'interno che mostra mese o settimana o giorno.
    nextMonth(){
        this.showedMonth++;
        this.date = this.date.add(1, "month");
        if(this.showedMonth > 12){
            this.showedMonth= 1;
            this.year++;
        }
    }
    prevMonth(){
        this.showedMonth--;
        this.date = this.date.subtract(1, "month");
        if (this.showedMonth < 1){
            this.showedMonth = 12;
            this.year--;
       }
    }
    prevWeek(){
        this.date = this.date.subtract(1, "week");
        this.currentWeek--; //scendo iso per calcolo anno
        if(this.currentWeek < 1){
            this.year--;
        }
      console.log(this.date)
    }
    nextWeek(){
        this.date = this.date.add(1, "week");
        this.currentWeek++; 
        if(this.currentWeek > 52){
            this.year++;
        }
    }
    prevDay(){
        this.date = this.date.subtract(1, "day");
        this.dayOfYear--;
        if(this.dayOfYear < 1){
            this.dayOfYear = 365;
            this.year--;
        }
    }
    nextDay(){
        this.date = this.date.add(1, "day");
        this.dayOfYear++;
        if(this.dayOfYear > 365){
            this.dayOfYear = 1;
            this.year++;
        }
    }


    highLightDayinMonth(){
        const highLight = document.querySelectorAll(".box-grid")
        highLight.forEach((box)=> {
            if(box.firstElementChild.dataset.day === this.date.format("YYYY-MM-DD")){
                box.classList.add("selected")
            }
        })
    }

    highLightDay(){
        const highLight = document.querySelectorAll(".day-name");
       
       //highLight ritorna una nodeList non dimenticare
       highLight.forEach((day)=>{
        day.classList.remove("is-today")
        if(day.dataset.day === this.date.format("YYYY-MM-DD")){
            day.classList.remove("normal-week")
            day.classList.add("is-today")
        }else{
            day.classList.remove("is-today")
            day.classList.add("normal-week")
        }
        
       })
    }
}
export const overlay = new CalendarLogic

function initNavInfo(){
    const displayMonth = overlay.date.month(overlay.showedMonth).format("MMMM");
    const currentMonday = overlay.date.weekday(0).format("DD MMMM");
    const currentSunday = overlay.date.weekday(6).format("DD MMMM");
    const showDailyDate = overlay.date.format("dddd, DD MMMM");
    const year = overlay.year;

    currentMonthDisplay.innerHTML=`${displayMonth}`;
    currentWeekDisplay.innerText =`${currentMonday} - ${currentSunday}`
    currentDailyDisplay.innerHTML=`${showDailyDate}`
    currentYearDisplay.innerHTML= `${year}`;
}

function highlightDayMonth(button) {
    const selectedDate = button.dataset.day;
    if (!selectedDate) return;
    overlay.setDate(dayjs(selectedDate));
//non serve syncAll anche qua perchè viene chiamato da setdate
}


function handleMonthGridClick(e){
    const selectedBtn = e.target.closest('[data-action="select-date"]')
    const cell = e.target.closest('[data-action="create-event"]')
    if(selectedBtn){
        e.stopPropagation()
        highlightDayMonth(selectedBtn)
        return
    }
    if(cell){
        e.stopPropagation()
        openModal(e)
        return
    }
}

function highLightWeek(e){
 let highLight = e.target.parentElement.parentElement.dataset.day
    // anche qua non serve syncAll, basta passargli setDate che chiama poi syncAll
    overlay.setDate(dayjs(highLight))
}
function OpenModalWeek (e){
    const selecthour = document.querySelectorAll(".week-box");
    const selectHalfhour = document.querySelectorAll(".week-half-box")

        selecthour.forEach( cell => cell.classList.remove("selected-week"));
        selectHalfhour.forEach( cell => cell.classList.remove("selected-week"));
    
    const box = e.target.closest(".week-box, .week-half-box");
        if (!box) return;

    if (!e.target.classList.contains("week-day-display")){
        e.target.classList.add("selected-week");
    }
    
    if( e.target.classList.contains("week-box")) {
    e.target.nextElementSibling.classList.add("selected-week")   
    } else if (e.target.classList.contains("week-half-box")){
        e.target.previousElementSibling.classList.add("selected-week")
    }
   openModal(e)
}

function handleClickWeek(e){
    if(e.target.classList.contains("week-box") || e.target.classList.contains("week-half-box" )){
        OpenModalWeek(e)
    } 
    if(e.target.classList.contains("header-btn")){
        highLightWeek(e)
    }
}
  
//click sul giorno
//refactor futuro, impostare l'intera logica sul closest per l'highlight, e se decido di tenere il singolo click; altrimenti in caso di drag per scelta multipla di orari il sistema di closest non funzionorebbe più, perchè dovrei fare riferimento al data-time storato all'interno di ogni elemento "li"
function handleDailyClick (e){
const selectHour = document.querySelectorAll(".day-box");
    const selectHalfhour = document.querySelectorAll(".day-half-box");

    selectHour.forEach( cell => cell.classList.remove("selected-time"))
    selectHalfhour.forEach( cell => cell.classList.remove("selected-time"))

    const box = e.target.closest(".day-box, .day-half-box");
        if (!box) return;

    if( e.target.classList.contains("day-box")) {
        e.target.nextElementSibling.classList.add("selected-time")   
    } else if (e.target.classList.contains("day-half-box")){
        e.target.previousElementSibling.classList.add("selected-time")
    }
        e.target.classList.add("selected-time");
    if( e.target.closest(".day-box, .day-half-box")){
        openModal(e)
    }
};



function bindCalendarEvents(){
    rightArrowMonth.addEventListener("click", () => {
        overlay.nextMonth();
        overlay.syncAll()
    })
    leftArrowMonth.addEventListener("click", () =>{
        overlay.prevMonth();
        overlay.syncAll()
    })
    leftArrowWeek.addEventListener("click", () => {
        overlay.prevWeek();
        overlay.syncAll()
    })
    rightArrowWeek.addEventListener("click", () => {
        overlay.nextWeek();
        overlay.syncAll()
    })
    leftArrowDay.addEventListener("click", () => {
        overlay.prevDay();
        overlay.syncAll()
    })  
    rightArrowDay.addEventListener("click", () =>{
        overlay.nextDay();
        overlay.syncAll()
    })
    grid.addEventListener("click", handleMonthGridClick)
    weekGrid.addEventListener("click", handleClickWeek )
    dayGrid.addEventListener("click", handleDailyClick)
}

export default function initCalendar(){
    initNavInfo()
    bindCalendarEvents()
    //in questo modo faccio partire la costruzione della griglia del mese senza dover chiamare la stessa funzione a parte, nell'init principale in index 
    overlay.syncAll()
}
