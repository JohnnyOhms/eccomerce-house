import * as v from "./var.js"
import {Hompage} from "./homepage.js"

window.addEventListener("DOMContentLoaded", ()=>{
    const home = new Hompage
    window.addEventListener("scroll",()=>{
        home.scrollTrack()
    })

    v.startShop.addEventListener('click',()=>{
        home.shopNow()
       
    })
    
})
