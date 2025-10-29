import dayjs from "./day.js"
import setuserDate from "./navbar.js";
import globalDate from "./state.js";

// import { globalDate } from "./state.js";
// import { selectedDate } from "./navbar.js";

//prendo gli elementi della navBar
const carosello = document.getElementById("month-carousel");
const display = document.querySelector(".month-view");
const grid = document.querySelector(".month-structure");
const currentYearDisplay = document.querySelector(".big-numbers.year");

const currentMonthDisplay = document.querySelector(".big-numbers.text") ;
const leftArrow = currentMonthDisplay.previousElementSibling;
const rightArrow = currentMonthDisplay.nextElementSibling;

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//--------------------il parametro che devo far passare è un array ----- devo tenere vistaCorrente come variabile globale--------------
// let userDate = null;
// let storedDate = null;
// let savedDate = getData();

 let vistaCorrente = globalDate;


//appunti, avere usato j, al posto dell'indice, vuol dire che ad ogni ciclo, siccomme aumenta il numero da 0 a 6, incrementa sia la casella, che l'indice dell'array; poi ho modificato entrambi in beforeend, che se no sarebbe stato invertito; 

 function createMonthGrid (vistaCorrente) { 
    //creiamo tutte le variabili che ci servono dalla libreria
        const giorniMese = vistaCorrente.daysInMonth(); //giorni del mese totale
        const primoGiorno = vistaCorrente.date(1);
        const ultimoGiorno = vistaCorrente.endOf("month")
        const lastDayPrevMonth = primoGiorno.subtract(1, "day"); //questo metodo, sottrae il tempo
        const firstDayNextMonth = ultimoGiorno.add(1, "day") ;
        
        const startMese = primoGiorno.day() //cosi otteniamo il giorno della settimana in numero
        
        //qua va usato il ternario e non l'if, perchè non voglio v o f, ma un nmumero; essendo che start mese definisce il numero della settimana, diventa quanti passano dallo 0? quel meno 1 serve a togliere quello corrente
        let offsetStart = (startMese === 0) ? 6 : startMese - 1;
    
        grid.innerHTML = ""

    for (let j=0; j<7; j++){
         grid.insertAdjacentHTML("beforeend", `<div class="day-grid">
        <div class="day-grid-btn" data-day="${days[j]}">${days[j]}</div>
        </div>` )
    }
    for ( let i=0; i<42; i++) {
        let dataDayID, dayNumber, dayClass, today;
            if (i < offsetStart) {
                dayNumber = lastDayPrevMonth.date() - (offsetStart - 1 - i);
                dataDayID = lastDayPrevMonth.date(dayNumber).format("YYYY-MM-DD") ;
                dayClass = "offset";
            } else if (i >= giorniMese + offsetStart) {
                dayNumber =  i - (offsetStart + giorniMese - 1);
                dataDayID = firstDayNextMonth.date(dayNumber).format("YYYY-MM-DD");
                dayClass = "offset";
            } else {
                dayNumber = i - offsetStart + 1 ;
                dataDayID = primoGiorno.date(dayNumber).format("YYYY-MM-DD"); //funziona perchè primo giorno partendo da 1 reitera ogni volta
                 if(dataDayID === globalDate.format("YYYY-MM-DD"))
                    {dayClass ="today set"
                    }else{dayClass="set"
                    }};
       grid.insertAdjacentHTML("beforeend", `<div class="box-grid ${dayClass}" > <div class="inside-box" data-day="${dataDayID}"><span class="number-box" >${dayNumber}</span></div></div>`); 
    }
}


//primo rimuovo la classe anche se non esiste ancora, cosi sono sicuro che ad ogni click la classe venga rimossa, poi aggiungo la classe al click
grid.addEventListener("click", (e) => {
    console.log(e.target)
    const celleSelezionate = grid.querySelectorAll(".selected");
    celleSelezionate.forEach(cell => cell.classList.remove("selected"));

    if(e.target.classList.contains("set") || e.target.classList.contains("offset")){
        e.target.classList.add("selected")
    }
    }
);

createMonthGrid(vistaCorrente)

export default createMonthGrid