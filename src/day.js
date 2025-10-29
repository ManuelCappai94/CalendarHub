// import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.18/+esm';
// import isoWeek from ""
// import isoWeek from './dayjs/plugin/isoWeek.js';
// import dayjs from './dayjs/dayjs.min.js';
dayjs.extend(window.dayjs_plugin_isoWeek)
dayjs.extend(window.dayjs_plugin_weekday)
dayjs.extend(window.dayjs_plugin_dayOfYear)
dayjs.extend(window.dayjs_plugin_localeData)

dayjs.locale("it-ch")


export default dayjs; 

