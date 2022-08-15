import * as v from "./var.js"
import {Hompage} from "./homepage.js"

window.addEventListener("DOMContentLoaded", ()=>{
    const home = new Hompage()
    window.addEventListener("scroll",()=>{
        home.scrollTrack()
        home.displayTopBtn()
    })

    v.startShop.addEventListener('click',()=>{
        home.shopNow()   
    })

    v.toTop.addEventListener("click", ()=>{
        home.goTop();  
    })
    
    v.footerIcons.forEach(items=>{
        items.addEventListener("click", (e)=>{
            e.preventDefault()
            home.footerIcons(e)
        })
    })

    setInterval(()=>{
        home.carousel()
    },2500)

    home.featuredProduct()
    .then((result)=>{
        home.displayFeatured(result)
    })
    
})
