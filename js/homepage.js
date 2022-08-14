import * as v from "./var.js"

export class Hompage{
    constructor(){
       
    }
   scrollTrack(){
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        var scrolled = (winScroll / height) * 100;
        v.scrollBar.style.width = scrolled + "%"
   }
    shopNow(){
        window.scrollTo({
            top : 0,
            behavior: "smooth"
        })
        this.shopPage()
   }
   shopPage(){
        setTimeout(()=>{
            location.href = "./pages/shop.html"
        }, 1000)
   }
   async featuredProduct(){
        let fetchData = await fetch()
   }
}

