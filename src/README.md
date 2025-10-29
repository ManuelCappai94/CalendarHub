# 🧩 Version 0.1 – Calendar App (October 2025)

## 📝 Description
This version finally has **month view**, **week view**, **daily view** fully synchronized. All the bugs from the previous versions have been fixed. 
The entire project is now flexible to a change in **date format**, thanks to a feature provide by the **Dayjs** library ([day.js.org](https://day.js.org/)). All the files inside the project's folder, have been reorganized for a clear and compact structure.

---

## ⚙️ Main Changes
- Refactored the HTML code.
- The displayed **daily view** now matches the selected day.
- Users can now switch between days.
- When entering the **daily view**, the **current time** is higlighted.
- Refactored the **createMonthGrid** function.
- **createMonthGrid**  now generates the names of the weekdays dinamically.
- **createMonthGrid** uses a new logic for creating offset days.
- Refactored all the logic inside **utils.js**, now the class **CalendarLogic** controls the entire calendar syncrhronisation.
- All functions in **utils.js** are now modular and reusable.
- In **month view**, users can click on any **daily box**. The clicked box is highlighted, and both the **week view** and **daily view** synchronize with that date. The corresponding **week view column** is also highlighted.
- In **week view**, users can click on any **daily column**. The selected column is highlighted, and both the **month view** and **daily view** synchronize with that date. The corresponding **month view box** is highlighted.
- In **daily view**, switching between days highlights the corresponding **daily box** and **week column** in **month view** and **week view**, respectively.
- It is possible to change the **date format** from italian to english and viceversa by changing manually the value in **dayjs.locale("it-ch")** on **day.js** module. this feture will be future implemented on a options menu.


---

## ⚙️ Bug fixes
- **createMonthGrid** now synchronizes correctly when the date format changes.
- Switching between weeks after changing the month now displays the correct dates.
- The first and last day in **week view** now match the selected date format.


## 📅 Next Version (v0.2)
- Add a module for creating and editing events.
- Write the logic for synchronising events on the calendar.
- Improve mobile responsiveness (refactoring grid layout).

---

## 💬 Personal Notes
The biggest challenge in this version was synchronizing the three views. To achieve this, I had to refactor all the code inside utils.js using classes. Working with classes was quite intuitive, but it helped me grow significantly in understanding the logic behind JavaScript.
I also encountered issues with the date format. Initially, I tried to force the Italian format using only the English format and Day.js plugins, but this approach proved inconsistent.
I decided to rewrite the logic in the monthly functions and in the week view switch function, making it more coherent and flexible. This also allowed me to fix existing bugs and introduce a new feature: the ability to switch the date format, which will be fully implemented in a future version.
Finally, I rewrote the initial offset calculation logic. At first, I used the function suggested by ChatGPT, but I reformulated it to make it consistent with the rest of the JS library usage. This makes the code modular and allows the calendar to adapt properly. It was a great exercise in problem solving and helped prevent errors in some edge cases.