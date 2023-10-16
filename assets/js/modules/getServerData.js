'use strict'

const getData = async() => {
    const data = await fetch(`https://daisy-awake-magician.glitch.me/api/goods`);
    
    return data.json()
}



export { getData }
