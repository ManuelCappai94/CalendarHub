import createElement from "../helpers/createElement.js";
const colorLists = document.querySelector(".color-list")
const ulContainer = document.querySelectorAll(".interactive-time-list")

const colors = [
  { name: "Blue", value: "blue", icon: "🟦" },
  { name: "Green", value: "green", icon: "🟩" },
  { name: "Purple", value: "purple", icon: "🟪" },
  { name: "Red", value: "red", icon: "🟥" }
];

export function renderColorList(){
    colorLists.innerHTML = "";

    colors.forEach(color => {
        createElement(
            colorLists, "color",
             `${color.name} <span>${color.icon}</span>`,
              "li",
                {
                    html : true,
                    dataset : {color: color.value}
                })
    })
}


// const handlerListStatus = ()=>{
//     let data;
//     const list = document.querySelectorAll(".list-item")
//     if(!list)return;
//     list.forEach(li =>{
//         li.addEventListener("click", ()=>{
//         const data = li.dataset.time
//            ulContainer.forEach(ul => ul.classList.remove("show-menù"))
//            return data
//         })
        
//     })
// }

export default function createCaroseul(){
    const array = Array.from({length: 24}, (_, i) =>{
        const hour = String(i).padStart(2, "0")
       return [
        `${hour}:00`,
        `${hour}:30`
       ]
    }).flat()
ulContainer.forEach(ul => {
    ul.innerHTML = "";

    array.forEach((item)=>{
        createElement(ul, "list-item", item, "li", {dataset : {time: item}} )
    })
})

}