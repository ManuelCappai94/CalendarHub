 export function setuserDate(e){
    
        const year = yearInput.value.trim(); //evito spazi vuoti
        const month = monthInput.value.trim();
        const day = dayInput.value.trim();
        console.log(yearInput.value)
               
        if (year && month && day){
            let date = dayjs()
                .set("year", parseInt(year))
                .set("month", parseInt(month) - 1)
                .set("date", parseInt(day)).format("YYYY-MM-DD");
                localStorage.setItem("userDate", JSON.stringify(date))
                showModal.classList.remove("show-mini-calendar")
              
                location.reload();            
          }else {
                showModal.classList.remove("show-mini-calendar")
          }
       };


     document.addEventListener("keyup", (e) => {
                if (e.key === "Enter"){  
                        setuserDate()
                        
                  }})