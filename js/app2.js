import * as v from "./var.js"
import {home} from "./app1.js"
import {LoadProduct} from "./product.js"

window.addEventListener("DOMContentLoaded", ()=>{
     v.toTop.addEventListener("click", ()=>{
        home.goTop();  
    })
    
    v.footerIcons.forEach(items=>{
    items.addEventListener("click", (e)=>{
        e.preventDefault()
        home.footerIcons(e)
    })
    })

    const load = new LoadProduct;
    load.getProducts()

})