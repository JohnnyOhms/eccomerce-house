import * as v from "./var.js"
import {ui} from "./app2.js"

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "0x63s6f5ny89",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "Mi_m39ZK9W6WjNtfOaOyRky_8TX5u8of1XWz2QdhQNE"
  });
 
export class LoadProduct{
    async getProductCloth(){
        let contentful_cloth = await client.getEntries({
            content_type:"ecommerceHouse"
        })
        let data = contentful_cloth
        let product = data.items
        return product
    }

    async getProductHat(){
        let contentful_hat = await client.getEntries({
            content_type: "productHat"
        })
        let data = contentful_hat
        let product = data.items
        return product
    }

    async getProductShoe(){
        let contentful_shoe = await client.getEntries({
            content_type: "ecommerceHome"
        })
        let data = contentful_shoe
        let product = data.items
        return product;
    }

    destructure(data){
        let product = data.map((item)=>{
            const {name, price} = item.fields;
            const image = item.fields.image.fields.file.url;
            return {name, price, image}
        })
       this.addID(product)
    }

    addID(product){
        product.forEach((item, i) => {
            item.id = i + 1;
        });
        this.shuffle(product)
    }

    shuffle(product){
        let currenIndex = product.length, randomIndex;
        while(currenIndex != 0){
            randomIndex = Math.floor(Math.random() * currenIndex)
            currenIndex --;
    
            [product[currenIndex], product[randomIndex]] = 
            [product[randomIndex], product[currenIndex]]
        }
        ui.displayProduct(product) 
    }

    cloth
}

export class UI {
    displayProduct(items){
        let display = ""
        items.forEach((item)=>{
            display += `
                <div class="items">
                <div class="item">
                        <img src="${item.image}" alt="">
                    <h2>${item.name}</h2>
                    <p class="price">$${item.price}</p>
                    <button class="cart-btn" data-id="${item.id}">
                        Add to cart
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </div>
            `
        })
        v.itemCollecton.innerHTML = display;
    }

    getButtons(){
        const btns = [...document.querySelectorAll(".cart-btn")]
        btns.forEach((btn)=>{
            let id = btn.dataset.id;
            let inCart = v.cart.find(item=>item.id === id)
            if (inCart) {
                btn.innerText = "In cart";
                btn.disabled = true;
            }
            btn.addEventListener("click", (e)=>{
                let target = e.target;
                target.innerHTML = `In cart <i class="fa-solid fa-cart-shopping"></i>`;
                target.disabled= true;

            })

        })
    }

    selectProduct(){
        v.selectProduct.forEach(item=>{
            item.addEventListener("click",(e)=>{
                v.selectProduct.forEach(rm=>{
                    rm.classList.remove("active")
                })
                item.className += " active"
                // e.target.classList.add("active")
                let fliter = e.target.dataset.fliter
                console.log(fliter);
            })
        })
    }


}

export class Storage{
    static saveProduct(item){
        localStorage.setItem("products", JSON.stringify(item))
    }
}