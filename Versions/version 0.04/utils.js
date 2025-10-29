import createMonthGrid from "./month.js";
import createWeekGrid from "./week.js";
import globalDate from "./state.js";

const currentMonthDisplay = document.querySelector(".big-numbers.text") ;
const currentYearDisplay = document.querySelector(".big-numbers.year");
/////month-overlay
const displayOverlayWeek = document.querySelector(".display-overlay.week") ;
const leftArrowMonth = currentMonthDisplay.previousElementSibling;
const rightArrowMonth = currentMonthDisplay.nextElementSibling;
///////week-overlay /////////
const currentWeekDisplay = displayOverlayWeek.firstElementChild.nextElementSibling
const leftArrowWeek = displayOverlayWeek.firstElementChild;
const rightArrowWeek = currentWeekDisplay.nextElementSibling;

let date = globalDate;
let currentMonth = date.month() +1;
let currentview = date;
let currentWeek = currentview.isoWeek() 
let year = currentview.year();

/////////////mese overlay corrente//////////////
let thisMonth = currentMonth - 1;
let displayMonth = date.month(thisMonth).format("MMMM");
currentMonthDisplay.innerHTML=`${displayMonth}`;
////settimana overlay corrente////////
const monday = currentview.weekday(1).format("DD MMMM");
const sunday = currentview.weekday(7).format("DD MMMM");
currentWeekDisplay.innerText =`${monday} - ${sunday}`
//////////////overlayYear//////////////

currentYearDisplay.innerHTML= `${year}`;
 



    
/////questa funzione gestisce la logica che viene passata come parametro a dcreateMonthGrid, la quale stabile il parametro array che viene passato a tutti  i dayjs()

function changeYear(currentView) {
    let array = [];
    currentView = date ;

    if(currentMonth < 1){
        currentMonth = 12;
        year--;
        currentYearDisplay.innerHTML= `${year}`;
       
    } else if (currentMonth > 12){
        currentMonth = 1;
        year++;
         currentYearDisplay.innerHTML= `${year}`;
    } 
         array.push(year, currentMonth , dayjs().date());
         currentView = dayjs(array);  
        return currentView
        
   } 

function prevMonth(){
    currentMonth--; 
    date = changeYear(date); // passa la vista corrente
    createMonthGrid(date);
    createWeekGrid(date) // aggiorna il calendario
    thisMonth--;
    displayMonth = date.month(thisMonth).format("MMMM");
    currentview = date.month(thisMonth);
    const monday = currentview.weekday(1).format("DD MMMM");
    const sunday = currentview.weekday(7).format("DD MMMM");
    currentWeekDisplay.innerText =`${monday} - ${sunday}`;
    console.log(monday)
    currentMonthDisplay.innerHTML=`${displayMonth}`;
}   


function prevWeek() {
    currentWeek--; //il problema sta qua, perchè si aggiorna al valore iniziale forse la soluzioneè unire tutto nella stassa logica
    currentview = date.isoWeek(currentWeek);
    const monday = currentview.weekday(1).format("DD MMMM");
    const displayMonth = currentview.weekday(1).format(" MMMM");
    const sunday = currentview.weekday(7).format("DD MMMM");
    currentWeekDisplay.innerText =`${monday} - ${sunday}`;
    currentMonthDisplay.innerHTML=`${displayMonth}`;
        if (currentWeek <= 0) {
        year = currentview.year()
        currentYearDisplay.innerHTML= `${year}`;
        }
    createWeekGrid(currentview);
    createMonthGrid(currentview);
}


function nextWeek(){
    currentWeek++;
    currentview = date.isoWeek(currentWeek);
    const monday = currentview.weekday(1).format("DD MMMM");
    const displayMonth = currentview.weekday(1).format(" MMMM");
    const sunday = currentview.weekday(7).format("DD MMMM");
    currentWeekDisplay.innerText =`${monday} - ${sunday}`;
    currentMonthDisplay.innerHTML=`${displayMonth}`;
        if (currentWeek > 52) {
            year = currentview.year();
        currentYearDisplay.innerHTML= `${year}`;
        }
    console.log(currentWeek)
    createWeekGrid(currentview);
    createMonthGrid(currentview);
}





function nextMonth() {
    currentMonth++; 
    date = changeYear(date); // passa la vista corrente
    createMonthGrid(date);
    createWeekGrid(date) // aggiorna il calendario
    thisMonth++;
        currentview = date.month(thisMonth);
    const monday = currentview.weekday(1).format("DD MMMM");
    const sunday = currentview.weekday(7).format("DD MMMM");
    currentWeekDisplay.innerText =`${monday} - ${sunday}`;
    displayMonth = date.month(thisMonth).format("MMMM");
    currentMonthDisplay.innerHTML=`${displayMonth}`;
}


leftArrowMonth.addEventListener("click", prevMonth)
leftArrowWeek.addEventListener("click", prevWeek)

rightArrowMonth.addEventListener("click",nextMonth)
rightArrowWeek.addEventListener("click", nextWeek)

