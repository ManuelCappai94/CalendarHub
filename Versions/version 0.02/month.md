 userDate((selectedDate)=> {
       if (selectedDate) {
   createMonthGrid(selectedDate);
   let thisMonth = selectedDate.month() ;
   let displayMonth = selectedDate.month(thisMonth).format("MMMM");
   currentMonthDisplay.innerHTML=`${displayMonth}`;
   let yearDisplayed = selectedDate.year();
   currentYearDisplay.innerHTML= `${yearDisplayed}`;

} else {
   createMonthGrid(vistaCorrente)
}
     })