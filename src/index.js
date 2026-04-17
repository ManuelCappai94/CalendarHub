// import dayjs from './day.js';

import"./navbar.js";
import"./month.js";
import "./utils/miniCalendar.js"
import"./calendarSync.js";
import"./week.js";
import"./daily.js";
import "./to-do-list/toDo.js"
import "./utils/theme.js"


///blocca tutti i comportamenti di selezione del testo della padina di defualt con il doppio click e la selezione
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});










