const createList = document.querySelector(".section-center")


export function initTodo(){
    const viewportWidth = window.innerWidth
    createList.classList.toggle("show-modal")
    const toDoWidth = createList.clientWidth
    let toDoPosition = viewportWidth/2 - toDoWidth/2
    
    createList.style.left = `${toDoPosition}px`
}
