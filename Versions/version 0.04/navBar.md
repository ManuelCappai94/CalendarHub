export default function setuserDate(nuovaData){
         
        document.addEventListener("keyup", (e) => {
                if (e.key === "Enter"){ 
                
                const year = yearInput.value.trim(); //evito spazi vuoti
                const month = monthInput.value.trim();
                const day = dayInput.value.trim();
               
                if (year && month && day){
                 let date = dayjs()
                .set("year", parseInt(year))
                .set("month", parseInt(month) - 1)
                .set("date", parseInt(day)).format("YYYY-MM-DD");
               
                // nuovaData(date); //devi passare le callback al dato, testina!! 
                localStorage.setItem("userDate", JSON.stringify(date))
                showModal.classList.remove("show-modal")
                // location.reload();            
          }else {
                showModal.classList.remove("show-modal")
          }
          
        }
       })
        };
setuserDate()