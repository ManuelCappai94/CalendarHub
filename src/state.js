
import dayjs from "./day.js";


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



export default globalDate


///importare qui la logica per creare il formato europeo da integrare nel calendario
// https://day.js.org/docs/en/plugin/locale-data