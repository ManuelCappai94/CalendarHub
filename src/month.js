
import dayjs from "./day.js"

import globalDate from "./state.js";


//prendo gli elementi della navBar

const grid = document.querySelector(".month-structure");
// const firstRow = document.querySelector(".day-grid")

 let vistaCorrente = globalDate;

 const test = dayjs().startOf("month").weekday()



//appunti, avere usato j, al posto dell'indice, vuol dire che ad ogni ciclo, siccomme aumenta il numero da 0 a 6, incrementa sia la casella, che l'indice dell'array; poi ho modificato entrambi in beforeend, che se no sarebbe stato invertito; 

 function createMonthGrid (vistaCorrente) { 
    //creiamo tutte le variabili che ci servono dalla libreria
        const giorniMese = vistaCorrente.daysInMonth(); //giorni del mese totale
        const primoGiorno = vistaCorrente.date(1);
        const firstDayIndex = vistaCorrente.startOf("month").weekday()
        const ultimoGiorno = vistaCorrente.endOf("month")
        const lastDayPrevMonth = primoGiorno.subtract(1, "day"); //questo metodo, sottrae il tempo
        const firstDayNextMonth = ultimoGiorno.add(1, "day") ;
        
        grid.innerHTML = "";

        const firstRow = document.createElement("div")
        firstRow.classList.add("day-grid")
        grid.appendChild(firstRow)
        
    for (let j=0; j<7; j++){
        let days = vistaCorrente.weekday(j).format("dddd");
        
         firstRow.insertAdjacentHTML("beforeend", `
        <div class="day-grid-btn">${days}</div>
        ` )
    }
    const secondRow = document.createElement("article")
        secondRow.classList.add("boxes-container")
        grid.appendChild(secondRow)
    for ( let i=0; i<42; i++) {
        let dataDayID, dayNumber, dayClass, today;
            if (i < firstDayIndex) {
                dayNumber = lastDayPrevMonth.date() - (firstDayIndex -1 - i);
                dataDayID = lastDayPrevMonth.date(dayNumber).format("YYYY-MM-DD") ;
                dayClass = "offset";
            } else if (i >= giorniMese + firstDayIndex) {
                dayNumber =  i - (firstDayIndex + giorniMese - 1);
                dataDayID = firstDayNextMonth.date(dayNumber).format("YYYY-MM-DD");
                dayClass = "offset";
            } else {
                dayNumber = i - firstDayIndex + 1 ;
                dataDayID = primoGiorno.date(dayNumber).format("YYYY-MM-DD"); //funziona perchè primo giorno partendo da 1 reitera ogni volta
                 if(dataDayID === globalDate.format("YYYY-MM-DD"))
                    {dayClass ="today set"
                    }else{dayClass="set"
                    }};
       secondRow.insertAdjacentHTML("beforeend", `<div class="box-grid ${dayClass}" > <div class="inside-box" data-day="${dataDayID}"><span class="number-box" >${dayNumber}</span></div></div>`); 
    }
}




//primo rimuovo la classe anche se non esiste ancora, cosi sono sicuro che ad ogni click la classe venga rimossa, poi aggiungo la classe al click


createMonthGrid(vistaCorrente)

export default createMonthGrid