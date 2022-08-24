import * as v from "./var.js"
import {home} from "./app1.js"
import {LoadProduct, UI} from "./product.js"
import { Cart } from "./cart.js";


export const load = new LoadProduct;
export const ui = new UI;
export const cart = new Cart;

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

    cart.startApp()

    load.getProductCloth()
    .then((data)=>{
        load.clothFliter(data)
        v.allProducts.push(...data)

    }).catch((error)=>{
        console.log(error);
    });

    load.getProductHat()
    .then((data)=>{
        load.hatFliter(data)
        v.allProducts.push(...data)

    }).catch((error)=>{
        console.log(error);
    });

    load.getProductShoe()
    .then((data)=>{
        load.shoeFliter(data)
        v.allProducts.push(...data)
        load.destructure(v.allProducts)
    })

    .then(()=>{
        ui.selectProduct()
       
    })
    
    .then(()=>{
        ui.getButtons()
        ui.searchByName()

    }).catch((error)=>{
        console.log(error);
    })
})