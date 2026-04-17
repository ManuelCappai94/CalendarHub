const createList = document.querySelector(".section-center")


const newList = document.querySelector(".new-btn")


newList.addEventListener("click", ()=>{
    createList.classList.toggle("show-modal")
})