import dayjs from "./day.js";

function getData(){
        let stored = localStorage.getItem("userDate");
         return stored 
}

getData()
let savedDate = getData();
let globalDate ;



function displayGrid(){
if (savedDate){
     globalDate = dayjs(savedDate) ;
} else {
    globalDate = dayjs()
}
// console.log(globalDate)
// return globalDate
}
displayGrid()

export default globalDate


///importare qui la logica per creare il formato europeo da integrare nel calendario
// https://day.js.org/docs/en/plugin/locale-data