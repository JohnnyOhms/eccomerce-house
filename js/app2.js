import * as v from "./var.js"
import {home} from "./app1.js"
import {LoadProduct, UI, Storage} from "./product.js"


export const load = new LoadProduct;
export const ui = new UI;
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

    load.getProductCloth()
    .then((data)=>{
        console.log(data);
        load.clothFliter(data)
        v.allProducts.push(...data)
    }).catch((error)=>{
        console.log(error);
    });

    load.getProductHat()
    .then((data)=>{
        v.allProducts.push(...data)
    }).catch((error)=>{
        console.log(error);
    });

    load.getProductShoe()
    .then((data)=>{
        v.allProducts.push(...data)
        load.destructure(v.allProducts)

    }).then(()=>{
        ui.selectProduct()
    })
    
    .then(()=>{
        ui.getButtons()

    }).catch((error)=>{
        console.log(error);
    })

    

})