
//per funzionare e far si che che io voglia inserire un innerHTML invece che l'inner Text, option deve contere html come truty
function createElement(father, elClass, el, tag, options = {}){
    const container = document.createElement(tag)
    if(elClass) container.classList.add(elClass)

    if(options.html){
        container.innerHTML = el;
    } else {
        container.innerText = el;
    }
   
    if(options.dataset){
        Object.entries(options.dataset).forEach(([key, value]) =>{
            container.dataset[key] = value
        })
    }

    father.appendChild(container)
    return container
}

export default createElement