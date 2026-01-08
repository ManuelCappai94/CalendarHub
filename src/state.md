//problema da risolvere, globaldate viene deciso una volta sola, quindi mi porta ad un caricamneto della pagina


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