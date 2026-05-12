# 🧩 Version 0.8 – CalendarHub

## 📝 Technical Overview

Version 0.8 represents the transition of CalendarHub from a UI-focused calendar application into a more advanced architecture-driven system.

This update introduces the complete foundation of the **event management engine**, including recurring events, runtime occurrence generation, contextual event interactions, synchronized rendering, and exception-based series handling.

The application now operates through a centralized synchronization flow designed to keep all calendar views and event states fully consistent across the entire interface.

---

# ⚙️ Core Architecture

## 🔁 Centralized Synchronization System

CalendarHub uses a centralized synchronization architecture based on a single rendering pipeline.

All calendar views:
- Month
- Week
- Daily
- Mini calendar

are synchronized through a shared state flow and unified rendering process.

### Main goals of this architecture:
- Maintain UI consistency
- Avoid duplicated rendering logic
- Simplify future scalability
- Keep all views synchronized automatically

---

# 🧠 Recurring Event Runtime Engine

One of the main additions of version 0.8 is the recurring event engine.

The system does not store every occurrence separately inside localStorage.

Instead:
- Only the original “mother event” is persisted
- Occurrences are dynamically generated at runtime
- Generated occurrences are merged into the rendering pipeline before rendering

This approach:
- Reduces duplicated storage
- Improves scalability
- Simplifies recurring event management
- Keeps rendering flexible and dynamic

---

## 🔄 Supported Recurring Systems

The engine currently supports:

- Daily repetition
- Weekly repetition
- Monthly repetition
- Custom date repetition
- Interval-based recurrence
- End-date limitation
- Multi-day weekly selection

---

## 🚫 Exception System

Recurring events support a dedicated exception system.

Instead of deleting generated occurrences directly:
- Hidden occurrences are stored as exceptions inside the mother event
- The runtime engine ignores those occurrences during generation

This system enables:
- Delete single occurrence
- Edit single occurrence
- Preserve recurring series integrity

---

## 🧬 Mother Event Promotion System

When deleting the first visible occurrence of a recurring series, the system automatically promotes the next valid occurrence as the new active reference date.

This avoids:
- Broken recurring chains
- Invalid starting references
- Series corruption

---

# 🗂️ Event Management System

## ✏️ Event Modal

The event modal now supports:
- Event creation
- Event editing
- Recurring event editing
- Single occurrence editing
- Preloaded date & time
- Context-aware opening logic

The modal dynamically adapts depending on:
- Current calendar view
- Selected date
- Selected time slot
- Recurring event state

---

## 📌 Contextual Info Banner

The contextual info banner system provides:
- Event details preview
- Contextual actions
- Edit/delete controls
- Recurring event actions
- Floating dynamic positioning

The positioning system dynamically adapts to:
- Desktop layout
- Mobile layout
- Daily view
- Weekly view
- Month view

---

# 🧱 UI & Rendering Improvements

## 🎨 Dynamic Seasonal Themes

The calendar now dynamically changes visual themes depending on the current season.

The system rotates backgrounds automatically during the year while preserving readability and UI consistency.

---

## 📱 Responsive Interaction Logic

Mobile interactions were redesigned to:
- Prevent modal overflow
- Improve floating element positioning
- Maintain usability in limited viewport space
- Center contextual interactions when necessary

---

# 🧩 Technical Refactors

## 🧹 Event Logic Cleanup

Several parts of the event system were refactored to:
- Reduce duplicated logic
- Improve readability
- Reuse rendering flows
- Simplify state cleanup
- Improve dropdown handling

---

## 🧱 Modular Architecture

The project structure was reorganized into separated modules for:
- Rendering
- Event logic
- Recurring systems
- UI handling
- Helpers
- Synchronization logic
- Draft management

---

# 🐛 Major Fixes

- Fixed floating modal positioning issues in large event containers
- Fixed repeated dropdown state inconsistencies
- Fixed event modal overflow issues on mobile
- Fixed recurring occurrence deletion edge cases
- Improved synchronization consistency between views
- Fixed multiple contextual UI interaction bugs

---

# 🔮 Next Steps (v0.9)

- Notification system implementation
- Tutorial chapter navigation
- DOM selector centralization refactor
- Validator centralization improvements
- Mini calendar architecture cleanup
- Additional recurring event refinements
- Additional UI polish & accessibility improvements

---

# 🚀 Long-Term Goals

- Electron desktop version
- Cloud synchronization
- Account system
- Drag & drop scheduling
- Backend persistence layer
- Advanced notification scheduling
- Internationalization support