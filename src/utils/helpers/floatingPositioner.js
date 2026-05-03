export default function getFloatingPosition(floatingElement, target, option){

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight;
    let top, left;

    
    //controllo verticale, ritorna boolenano falso se sta giu, true se in alto
    const hasSpaceBelow = target.bottom + floatingElement.clientHeight <= viewportHeight
    const hasSpaceAbove = target.top - floatingElement.clientHeight >= 0;
    // ---- controllo orizzontale ----
    const hasSpaceRight = target.right  + floatingElement.clientWidth <= viewportWidth;
    const hasSpaceLeft = target.left  -  floatingElement.clientWidth >= 0;
    //quello che fa closest, è cercare riferiferimenti a quella classe, o attributo "data-action" nel nodo più vicino
    

    if(viewportWidth<= 992){
        top = viewportHeight/2 - floatingElement.clientHeight/2
        left = viewportWidth/2 - floatingElement.clientWidth/2
    }else{
        if(!option){
        if(hasSpaceBelow || !hasSpaceAbove){
        top = target.top 
        } else{
            top = target.bottom - floatingElement.clientHeight - 30
        }

        if (hasSpaceRight || !hasSpaceLeft) {
            // default: apro a destra
            left = target.right ;
        } else {
            left = target.left -  floatingElement.clientWidth ;
        }
    }
     if(option){
        // console.log(test)
        if(hasSpaceBelow || !hasSpaceAbove){
            top = target.top 
        } else{
            top = target.bottom - floatingElement.clientHeight 
        }
        left = viewportWidth/2 - floatingElement.clientWidth/2
    }
   }
  floatingElement.style.top = `${top}px`;
  floatingElement.style.left = `${left}px`;
}