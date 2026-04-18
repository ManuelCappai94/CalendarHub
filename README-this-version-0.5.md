# 🧩 Version 0.5 – Calendar Hub

## 📝 Description

This version represents a major architectural and UI improvement of the calendar application.

The core system has been refactored to introduce a **centralized synchronization mechanism**, improving consistency across all views (month, week, day) and simplifying future feature development.

The foundation of the **event creation system** has been implemented, along with several UX and structural improvements.

---

## ⚙️ Main Improvements

### 🔁 Calendar Synchronization (Core Refactor)

- Introduced a centralized synchronization system via `syncAll()`
- Established a **single source of truth** for the entire calendar state
- All views (month, week, daily) now update consistently through one entry point
- Improved maintainability and scalability of the application

---

### 🧠 Architecture Refactor

- Refactored previous `utils.js` into a dedicated synchronization module
- Improved modular structure across the project
- Reorganized folder structure for better separation of concerns
- Refactored `createMonthGrid` to make it reusable (shared with mini calendar)

---

### 🧩 Event System (Foundation)

- Introduced event creation modal
- Modal now:
  - Opens from month, week, and daily views
  - Receives and preloads selected **date and time**
  - Can be closed via dedicated button
- UI structure for the event system fully designed (CSS + layout)

---

### 🗓️ Mini Calendar

- Added interactive mini calendar component
- Accessible from navbar
- Allows direct date selection
- Fully synchronized with main calendar state

---

### 🎨 UI & UX Improvements

- Updated navbar layout
- Added SVG icons for improved usability
- Improved navigation experience between views
- Refactored CSS structure for better scalability and organization

---

### 🌄 Dynamic Seasonal Theme

- Introduced dynamic background system based on the current month
- Automatically switches visual theme every 3 months (4 seasons)
- Enhances visual identity and user experience
- Integrated without compromising readability of the UI

---

### 🔘 Interaction Improvements

- Improved click handling logic across all views
- Clear separation between:
  - Date selection
  - Time slot interaction
  - Event creation trigger

---

### 🎯 Interaction Model Redesign

- Refactored how date selection and interaction work across all views

#### Month View
- Clicking on the **day number** updates the internal calendar date
- Clicking on the **cell body** opens the event creation modal

#### Week View
- Clicking on the **day header (label + number)** updates the internal date
- Clicking on **time slots** opens the event modal

#### Daily View
- Date selection handled via navigation controls (previous / next)
- Time slots are dedicated to event creation

This separation improves clarity between navigation and interaction, preventing conflicts between date selection and event creation.

---

### 🧱 Additional Changes

- Added toggle controls for To-Do section (still placeholder)
- Improved reusability of multiple functions
- Cleaned and optimized various parts of the codebase

---

## 🐛 Bug Fixes

- Fixed issue in **month view** where dragging across cells caused `undefined` date
- Fixed similar issue in **week view** with drag interaction breaking date reference

---

## 📅 Next Steps (v0.7)

- Complete event system logic (creation, rendering, persistence)
- Event visualization inside calendar grid
- UI refinement and mobile optimization

---

## 🚀 Future Improvements

- Locale switch (EU ↔ US date & time format)
- Language consistency across UI
- Full internationalization support