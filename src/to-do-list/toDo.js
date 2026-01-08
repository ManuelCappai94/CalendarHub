const createList = document.querySelector(".section-center")


const newList = document.querySelector(".new-btn")

console.log(newList)

newList.addEventListener("click", ()=>{
    createList.classList.toggle("show-modal")
})