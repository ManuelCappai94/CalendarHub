//problema da risolvere, globaldate viene deciso una volta sola, quindi mi porta ad un caricamneto della pagina, devo syncarlo con syncall, senza creare una dipendenza circolare


import dayjs from "./day.js";

// function getData(){
//         let stored = localStorage.getItem("userDate");
//          return stored 
// }

// getData()
// let savedDate = getData();
// let globalDate ;



// function displayGrid(){
// if (savedDate){
//      globalDate = dayjs(savedDate) ;
// } else {
//     globalDate = dayjs()
// }
// // console.log(globalDate)
// // return globalDate
// }
// displayGrid()

//la soluzione è fare gestire sia inizializzazione data e salvataggio data a globalDate, per poi chiamare il metodo all'interno del miniCalendario
const globalDate = {
    date: null,

    init(){
        const stored = localStorage.getItem("userDate");
        this.date = stored? dayjs(JSON.parse(stored)) : dayjs();
    },
    setDate(newDate) {
        this.date = newDate;
        localStorage.setItem(
        "userDate",
        JSON.stringify(newDate.format("YYYY-MM-DD"))
    );
  }
};


globalDate.init()

console.log(globalDate)

export default globalDate


///importare qui la logica per creare il formato europeo da integrare nel calendario
// https://day.js.org/docs/en/plugin/locale-data