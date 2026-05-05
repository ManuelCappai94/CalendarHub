export const  repeatEventsDraft = {
    seriesId : null,
    type : null,
    interval : 1,
    weekdays : [],
    customDates : [],
    until : null 
}

export function updateRepeatDraft (field, value) {
    repeatEventsDraft[field] = value
}
