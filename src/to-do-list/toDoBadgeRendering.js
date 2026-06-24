import { monthGrid, weekGrid, dayGrid} from "../utils/helpers/dom/mainCalendarDom.js"
import { getTodoFromLocalStorage } from "./toDoStorage.js"

function renderBadgeInMonth(allTodo){
    const todoContainer = monthGrid.querySelectorAll(".todo-container-month")
  
    todoContainer.forEach(container => {
        const dataDay =  container.parentElement.parentElement.dataset.day
       const todoOfDay = allTodo.filter(todo => todo.date === dataDay)
        //il check l'ho messo perchè se no l'elemnto per todo list multiple in giornata sarebbe stato reinderizzato più volte, cosi evito questo comportamento
            if(todoOfDay.length > 0){
                container.classList.add("show-todo-btn")
                container.innerHTML = 
                `<button type="button" class="todo-btn-header">
                    <span class="todo-count">
                    ${todoOfDay.length}
                    </span>
                    <span class="todo-icon">📜</span>
                </button>
                `
            }else{
                container.innerHTML = ""
                if(container.classList.contains("show-todo-btn")){
                    container.classList.remove("show-todo-btn")
                }
            }
            
    })
}
function renderBadgeInWeek(allTodo){
    const todoContainer = weekGrid.querySelectorAll(".week-todo-container")
  
        todoContainer.forEach(container => {
            const dataDay = container.parentElement.parentElement.dataset.day
            const todoOfDay = allTodo.filter(todo => todo.date === dataDay )
            if (todoOfDay.length > 0 ){
                container.innerHTML = 
                `<button type="button" class="todo-btn-header">
                    <span class="todo-count">
                    ${todoOfDay.length}
                    </span>
                    <span class="todo-icon">📜</span>
                </button>
                `
            } else {
                container.innerHTML = ""
            }
        })
}

function renderBadgeDaily(allTodo){
    const todoContainer = dayGrid.querySelector(".daily-todo-container")
    const dataDay = dayGrid.querySelector(".daily-header").dataset.day
    const todoOfDay = allTodo.filter(todo => todo.date === dataDay )
    if (todoOfDay.length > 0 ){
                todoContainer.innerHTML = 
                `<button type="button" class="todo-btn-header">
                    <span class="todo-count">
                    ${todoOfDay.length}
                    </span>
                    <span class="todo-icon">📜</span>
                </button>
                `
            } else {
                todoContainer.innerHTML = ""
            }

}


export function initRenderBadge(){
    const allTodo = getTodoFromLocalStorage()

    renderBadgeInMonth(allTodo)
    renderBadgeInWeek(allTodo)
    renderBadgeDaily(allTodo)
}