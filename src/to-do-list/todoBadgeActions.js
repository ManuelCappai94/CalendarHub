import { getTodoFromLocalStorage } from "./toDoStorage.js";
import createElement from "../utils/helpers/createElement.js";
import getDropDownPosition from "../utils/helpers/dropDownPositioner.js";
import { monthGrid } from "../utils/helpers/dom/mainCalendarDom.js";

function createItemsOfTodoMenu(items, father){

    items.forEach(item => {
        createElement(father, "", item.title, "li", {dataset : {id : item.id, action : "rehydrate-todo"}})
    });
}

export function openContextualMenu(date, fatherCell){
  const allTodo = getTodoFromLocalStorage()
  const existingMenu = monthGrid.querySelector(".contextual-menu")
  if(existingMenu){
    closeContextualMenu()
  }
  const todoOfTheDay = allTodo.filter(todo => todo.date === date)

  const menu = createElement(
    fatherCell,
     "contextual-menu",
        `<ul class="contextual-menu-list"></ul>
        `,
        "div",
        {
            html: true
        }
    )
    const ul = menu.querySelector(".contextual-menu-list")
     createItemsOfTodoMenu(todoOfTheDay, ul)
    getDropDownPosition(menu, fatherCell)
}

export function handleOutsideContextualMenuClick(){
    document.addEventListener("click", (e)=> {
        const menu = monthGrid.querySelector(".contextual-menu")
              if(menu){
                  const inside = e.target.closest(".contextual-menu")
            if(!inside){
               closeContextualMenu()
            }
              }
        })
}

function cleanUpContextualMenu(menu){
    menu.remove()
    const cells = monthGrid.querySelectorAll(".box-grid")
    cells.forEach(cell => cell.style.zIndex = "10")
    return
}

export function closeContextualMenu() {
    const menu = monthGrid.querySelector(".contextual-menu")
    if (!menu) return

    cleanUpContextualMenu(menu)
}
