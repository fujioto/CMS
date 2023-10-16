"use strict"


const filter = () => {
    const placeHolder = document.getElementById("input")
    placeHolder.oninput = function() {
        let value = this.value.trim();
        let list = document.querySelectorAll("td")
        

        if (value) {
            list.forEach(e => {
                
                    if (e.innerText.search(value) == -1) {
                        if (e.className == 'name') {
                            console.log(e.innerText)
                            e.parentNode.classList.add('hide');
                        }
                        
                    } 
            })
        } else {
            list.forEach(e => {
                e.parentNode.classList.remove('hide');
            })
        }
    }
}

export {filter}