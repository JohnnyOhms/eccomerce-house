import * as v from "./var.js"
import {Hompage} from "./homepage.js"

window.addEventListener("DOMContentLoaded", ()=>{
    const home = new Hompage()
    window.addEventListener("scroll",()=>{
        home.scrollTrack()
        // home.goTop()
    })

  

    v.startShop.addEventListener('click',()=>{
        home.shopNow()     
    })

    setInterval(()=>{
        home.carousel()
    },2500)

    home.featuredProduct()
    .then((result)=>{
        home.displayFeatured(result)
    })
    
})
