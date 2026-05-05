 export function getEvents(){
    const storedEvents = localStorage.getItem("calendarEvents");
    if(!storedEvents)return [];

    try{
        const parsedEvents = JSON.parse(storedEvents)

        if(!Array.isArray(parsedEvents))return [];
        // console.count("get Event")
        return parsedEvents;
    } catch(error){
        console.error("invalid calendarEvents in localSotrage", error);
        return [] //deve ritornare sempre un array che se no con l'errore esplode tutto
        
    }
 }

 export function saveEventsInLocalStorage(events){
    localStorage.setItem("calendarEvents", JSON.stringify(events))
 }

 export function deleteEventFromLocalStorage(currentId){
    const events = getEvents() 
    const updatedEvents = events.filter(event => event.id !== currentId)
    
    saveEventsInLocalStorage(updatedEvents)
 }