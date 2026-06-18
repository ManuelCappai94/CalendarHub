import { monthGrid } from "../utils/helpers/dom/mainCalendarDom.js"
import { getTodoFromLocalStorage } from "./toDoStorage.js"

function renderBadgeInMonth(){
    const todoBtns = monthGrid.querySelectorAll(".todo-container-month")
    const allTodo = getTodoFromLocalStorage()
   
    todoBtns.forEach(btn => {
        const dataDay =  btn.parentElement.parentElement.dataset.day
       const todoOfDay = allTodo.filter(todo => todo.date === dataDay)
      
        //il check l'ho messo perchè se no l'elemnto per todo list multiple in giornata sarebbe stato reinderizzato più volte, cosi evito questo comportamento
            if(todoOfDay.length > 0){
                btn.classList.add("show-todo-btn")
                btn.innerHTML = `<span class="todo-count">${todoOfDay.length}</span><span class="todo-icon">📃</span>`
            }else{
                btn.innerHTML = ""
                if(btn.classList.contains("show-todo-btn")){
                    btn.classList.remove("show-todo-btn")
                }
            }
            
    })
}





export function initRenderBadge(){
    renderBadgeInMonth()
}