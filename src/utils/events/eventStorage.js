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
        return error
        
    }
 }