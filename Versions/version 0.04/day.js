// import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
// import isoWeek from ""
// import isoWeek from './dayjs/plugin/isoWeek.js';
// import dayjs from './dayjs/dayjs.min.js';
dayjs.extend(window.dayjs_plugin_isoWeek)
dayjs.extend(window.dayjs_plugin_weekday)



export default dayjs; 

//iniziamente avevo tentato di creare l'inport principale nell'index, ma questo creave un loop circolare, dopo un po di trial and error, somo giunto alla conclusione che è meglio crearlo in un file js dedicato; opppure chiamare il link in ogni modulo js.