
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


export function createMessage(message, container, father){
  const positionTop = container.getClientRects()[0].top
  const positionLeft = container.getClientRects()[0].left 
  
    const alert = createElement(
      father,
      "missing-info-alert",
        message,
      "p"
    )
    setTimeout(()=>{
      alert.remove()
    }, 2000)

    const messageContainer = document.querySelector(".missing-info-alert")
    messageContainer.style.top = positionTop + "px"
    messageContainer.style.left = positionLeft + "px"
}



export default createElement