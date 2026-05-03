
//qeuste mi servono per rifattorizzare anche il codice di eventLogic e eventDraft (validatore)

export const separateHourFromMinute = (time)=>{
    const hour = time.slice(0, 2)
    const minute = time.slice(3, 5)

    return {
        hour : hour,
        minute : minute
    }
}
export const timeToMinutes = (time)=>{
    const {hour, minute} = separateHourFromMinute(time)

    return Number(hour)*60 + Number(minute)
}
