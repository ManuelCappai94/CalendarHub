# 🗓️ CalendarHub
This is my first project, it's a personal calendar and to-do app, built from scratch with vanilla JavaScript to improve my skills and experiment with real-time interaction.
---
## ⚙️ Features
- Month, Week, and Daily views fully synchronized.
- Clickable daily boxes in month view, week columns in week view.
- Current day/time highlighted in daily view.
-  Flexible date format switching (Italian ↔ English).
-  Event module planned for next version.

---
## 📅 Next Version (v0.2)
- Add event creation and editing module.
- Event synchronization with calendar views.
- Mobile UI refactoring and optional theme switching.
---
## 🕓 Old Versions

- Previous versions of this project are available in the **Versions** branch.

➡️ [Go to old versions](https://github.com/ManuelCappai94/CalendarHub/tree/versions)

- Each folder corresponds to a different release (v0.1, v0.2, etc.), including its own mini-README and source files.

---

> The biggest challenge in this version was synchronizing the three views.  
> To solve this, I refactored all the logic in `utils.js` using classes (`CalendarLogic`).  
> Using classes was intuitive but helped me understand JavaScript logic much better.  
> I also faced issues with date formats: initially, I forced the Italian format using only the English format and some Day.js plugins, but this was inconsistent.  
> I rewrote the month and week view logic, which also allowed me to implement the future feature of switching date formats.  
> The offset calculation logic was also rewritten for consistency with Day.js, improving modularity and overall calendar adaptability.  
> This was excellent problem-solving practice and helped catch some edge-case bugs.

---

## 🧩 Assets & Credits
- Calendar logic built with [Day.js](https://day.js.org/)
- Trash bin icon by [dDara](https://www.freepik.com/icon/bin_2602768), used under Freepik License (**Attribution Required**)
- Custom icons and textures created with **Piskel**
