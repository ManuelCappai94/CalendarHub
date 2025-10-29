# 🧩 Version 0.02 – Calendar App (October 2025)

## 📝 Description
- The main focus of this version was to **refactor the month view** and start writing and understanding the logic needed to make it work properly in **JavaScript**.  
- The month grid is now coherent with the current period, and you can switch between months.  
- The UI has also been reworked, using a color palette from [Coolors](https://coolors.co/) and fonts from [Google Fonts](https://fonts.google.com/).  
- The project now uses the **Day.js** library ([day.js.org](https://day.js.org/)).

---

## ⚙️ Main Changes
- Added a modular structure for importing and exporting JS files.  
- Refactored the HTML code. (still incomplete) 
- Updated the UI with new colors, fonts, and sizes (still incomplete).  
- Added navigation between **Month View**, **Week View**, and **Daily View**  
  (these need further refactoring to make the functions more modular).  
- Added 7 more boxes for the month grid.  
- The displayed "month grid" now matches the selected month.  
- Users can now switch between months.  
- Users can also choose a custom date by clicking on the month’s name.  
- Added a **“Today”** button in the navigation bar to return to the current date.

---

## 📅 Next Version (v0.05)
- Refactor the HTML structure for the **Week View**.  
- Implement the logic for switching between weeks.  
- Synchronize the **Month View** and **Week View**.

---

## 💬 Personal Notes
> The biggest challenge in this version was figuring out how to display a synchronized month grid.  
> It required a lot of research and trial and error. Thanks to ChatGPT, I better understood the logic behind **offsets**.  
>
> Understanding how the Day.js library works in a JavaScript environment was mostly straightforward,  
> but using it effectively was a bit tricky at first. The documentation and examples on the official website helped a lot.  
>
> Lastly, I’m finally starting to understand how functions and loops combine, works in a real project.