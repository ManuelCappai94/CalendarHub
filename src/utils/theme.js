import dayjs from "../day.js"

const seasonalBackgrounds = {
  spring: "./images/background/primavera.png",
  summer: "./images/background/estate.png",
  autumn: "./images/background/autunno.png",
  winter: "./images/background/inverno.png"
}

export const theme = (date) => {
    if(date.month() >=2 && date.month() < 5){
        document.body.style.backgroundImage = `url(${seasonalBackgrounds.spring})`
    } else if (date.month() >=5 && date.month() < 8){
        document.body.style.backgroundImage = `url(${seasonalBackgrounds.summer})`
    } else if (date.month() >=8 && date.month() < 11){
        document.body.style.backgroundImage = `url(${seasonalBackgrounds.autumn})`
    } else {
        document.body.style.backgroundImage = `url(${seasonalBackgrounds.winter})`
    }
    
}

//non serve importare theme nell'index, perchè lo chiama syncAll, che viene già passato nell'index