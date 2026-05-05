import { repeatEventsDraft, updateRepeatDraft } from "../utils/events/repeatEventsDraft.js";
import handleListSelection from "../utils/helpers/listSelection.js";

const repeatContainer = document.querySelector(".modal-repeat") 
const modeBtn = repeatContainer.querySelector(".repeat-mode-btn")
const modeList = repeatContainer.querySelector(".repeat-mode-list")


export function initRepeatEvents(){
    console.log(repeatEventsDraft)
    modeBtn.addEventListener("click", ()=>{
        modeList.classList.toggle("show-mode-list")
        console.log(repeatEventsDraft)
    })

    handleListSelection(
        modeList,
         ".repeat-mode-list-item",
         (li) =>{
            updateRepeatDraft("type", li.dataset.repeatType)
            modeBtn.innerText = li.innerText
         },
         "show-mode-list"
        )

    // modeList.addEventListener("click", (e)=>{
    //  const li = e.target.closest(".repeat-mode-list-item")
    //  if(!li) return;
    //  modeBtn.innerText = li.innerText
    //  modeList.classList.remove("show-mode-list")
    //  updateRepeatDraft("type", li.dataset.repeatType)
    //  console.log(repeatEventsDraft)
    // })
}