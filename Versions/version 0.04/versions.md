////////////SVILUPPPO//////////////////
il design delle 3 viste è stato prima progettato a mano, giusto per farmi un idea sul come avrei voluto che fosse la vista finale;
e lo stesso durante la prima parte dello sviluppo delle interfaccie, ho realizzatp una visione fittizia del calendario con un copia e incolla dei vari blocchi, in modo tale che quando avrei dovuto inietare il contenuto tramite manipolazione DOM, avrei già avuto una vista stilizzata funzionante.
scheletro --> estetica (grezza ) --> manipolazione DOM e gestione eventi --> utilizzo libreria esterna--> estetica finale

Ho appreso che con ctrl+ shift + l si possono cancellari tanti elementi uguali assieme

dopo ore passate a cercare di allineare le celle in orizzonatale ho scoperto che il grid le sistema in automatico anche in orizzontale D:

ho avuto serie difficolta inizialmente a rendere le proporzioni della griglia coerenti, chat gpt non aiutava di certo; alla fine ho risolto aggiustando in pixel le misure delle caselle che rigurdano gli orari




logica dayjs() 
const today = dayjs().date() //utile da usare per evidenziare il giorno corrente
const mese = dayjs().get("month") //cosi ho il mese corrente espresso in index; creero un array contenente i mesi;
const giornoMese = dayjs().date(2).format("D") //con format posso cambiare l'output con il numero
const startOfMonth = dayjs().startOf("month") //inizio mese corrente
const endOfMonth = dayjs().endOf("month")
//devo prelevare il data-weekday per conoscere la posizione della casella 
console.log(mese)
console.log(today);
console.log(startOfMonth)
console.log(endOfMonth)
console.log(giornoMese)


const lastDayPrevMonth = primoGiorno.subtract(1, "day"); //.subtract, serve per manipolare il tempo, in questo caso sottrarre un certo quantitativo dei tempo, è un metodo definito nella libreria dayjs()

const startMese = primoGiorno.day() //il metodo .day() mi dichiara il giorno della settimana; essendo che primoGiorno punta al inizio del mese il . day() mi ritorna il numero corrispondente
////////////////////////////////////////////
la logica per impostare i giorni corretti sulla griglia si basa su un calcolo che sottrae il numero dei giorni del mese alla variabile che fa da iterazione, che gestisce il numero delle caselle; a questo numero deve essere sottratto l'offset in positivo e negattivo, lo stesso calcolo dell offsert si basa nel sottrarre i giorni della settimana mancanti dall'inizio della griglia

dayjs([2010, 6, 10]); // July 10th

test settimana
const prova = dayjs().weekday(1).hour(2).minute(0).format("YYYY-MM-DD : HH:mm") // le 2 di lunedi
const prova2 = dayjs().weekday(1).hour(2).minute(30).format("YYYY-MM-DD : HH:mm") //decide l'ora 2 e mezza di notte di lunedi

const prova5 = currentWeek;
const prova4 = dayjs().isoWeek(prova5) //cosi determino la settimana attuale;