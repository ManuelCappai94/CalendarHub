function getDropDownPosition(conatinerElement, fatherContainer){
    let left;
    
    const viewportWidth = window.innerWidth

    const containerRect = conatinerElement.getBoundingClientRect()
    const fatherRect = fatherContainer.getBoundingClientRect()
    
    // console.log(containerRect.width)
    const containerWidth = containerRect.width
    const fatherRight = fatherRect.right
    const fatherLeft = fatherRect.left

    const hasSpaceRight = fatherRight + containerWidth <= viewportWidth
    
    if(hasSpaceRight){
        left = fatherRight
    } else {
        left = fatherLeft 
    }

    conatinerElement.style.left =`${left}px`
    //ho alzato lo z-index del padre perchè le celle vengono generate una dopo l'altra, 
    //questo siginifica che il menu veniva sovrascritto dalla cella successiva.
    //infatti se il menu si apriva su una cella precedente, questo non veniva sovvrascritto
    conatinerElement.style.zIndex = "100"
    fatherContainer.style.zIndex = "99"
}

export default getDropDownPosition