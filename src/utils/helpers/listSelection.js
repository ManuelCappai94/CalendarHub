function handleListSelection(list, itemSelector, onSelect, closeDropDownClass){
    list.addEventListener("click", (e)=>{
     const item = e.target.closest(itemSelector)
        if (!item) return       

        onSelect(item)

        list.classList.remove(closeDropDownClass)
    })
}

export default handleListSelection