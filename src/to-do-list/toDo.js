const createList = document.querySelector(".section-center")


const newList = document.querySelector(".new-btn")


newList.addEventListener("click", (e)=>{
    const viewportWidth = window.innerWidth
    createList.classList.toggle("show-modal")
    const toDoWidth = createList.clientWidth
    let toDoPosition = viewportWidth/2 - toDoWidth/2
    

    createList.style.left = `${toDoPosition}px`
})