# 🧩 Version 0.05 – Calendar APP (October /  2025)

## 📝 Description
- The main focus of this version was to **refactor the week view** and implement its logic in **javascript**.
- The week grid, is coherent with the displayed period , and you can switch between weeks.
- The **month view** and **week view** are now syncronized, changing the month automatically updates the Week View, and viceversa (although further refinement is needed).
- I also decided to include the **Day.js** library ([day.js.org](https://day.js.org/)) directly inside the project folder for two reasons:  
  1. In case the library ever becomes discontinued.  
  2. To properly use and manage its plugins.

---

## ⚙️ Main Changes
- Refactored the HTML code. (still incomplete).
- Installed the **dayjs**library inside the project's folder.
- The displayed **week grid** now matches the selected week.
- Users can now switch between weeks.
- **month** and **weeks** are partially syncronized (this will be fully completed after the **Daily View** implementation).
- Refactored the logic for **change month && change week** into a separeted module.

---

## 📅 Next Version (v0.1)
- Final refactor for thr HTML code.
- Implement the **Daily view** logic.
- Complete synchronization between **Month**, **Week**, and **Daily** views.

---

## 💬 Personal Notes
> Synchronizing the two views was no joke — it took a lot of trial and error.  
> In the end, the best approach was to manage synchronization through a single module.  
>
> Thanks to that, I avoided many continuity bugs caused by multiple imports and exports across different JS files.