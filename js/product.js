import * as v from "./var.js"
import {cart, ui} from "./app2.js"
import { StorageCart } from "./cart.js"
import { home } from "./app1.js";


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
            const {name, price, fliter} = item.fields;
            const image = item.fields.image.fields.file.url;
            return {name, price, fliter, image}
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

    clothFliter(data){
        data.forEach(item=>{
            item.fields.fliter = "cloth"
        })
    }

    hatFliter(data){
        data.forEach(item=>{
            item.fields.fliter = "hat"
        })
    }

    shoeFliter(data){
        data.forEach(item=>{
            item.fields.fliter = "shoe"
        })
    }
}

export class UI {
    displayProduct(items){
        let display = ""
        items.forEach((item)=>{
            display += `
                <div class="items" id="${item.fliter}">
                    <div class="item">
                            <img src="${item.image}" alt="">
                        <h2 id="name">${item.name}</h2>
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
        Storage.saveProduct(items)
    }

    getButtons(){
        const btns = [...document.querySelectorAll(".cart-btn")]
        btns.forEach((btn)=>{
            let ids = btn.dataset.id;
            this.checkInCart(ids, btn)

            btn.addEventListener("click", (e)=>{
                let target = e.target;
                let id= target.dataset.id;
                target.innerHTML = `In cart <i class="fa-solid fa-cart-shopping" style="color:black;"></i>`;
                target.disabled = true;
                Storage.getProduct(id)
            })

        })

        //make a seperate array for each single btns
        for(var i of  btns){
            v.eachButton.push(i)
        }
    }

    checkInCart(ids, btn){
        let inCart = JSON.parse(localStorage.getItem("cart")) || []
        let cartIn = inCart.find(function(e){
            return e.id == ids
        })
     
        if (cartIn) {
            btn.innerHTML = `In cart <i class="fa-solid fa-cart-shopping" style="color:black;"></i>`;
            btn.disabled = true;
        }
        else{
            btn.innerHTML = `Add to cart <i class="fa-solid fa-cart-shopping"></i>`;
            btn.disabled = false;
        }
    }

    selectProduct(){
        v.selectProduct.forEach(item=>{
            item.addEventListener("click",(e)=>{
                v.selectProduct.forEach(rm=>{
                    rm.classList.remove("active")
                })
                item.className += " active"
                let fliter = e.target.dataset.fliter
               this.fliterItems(fliter)
            })
        })
    }

    fliterItems(fliter){
        const product = document.querySelectorAll(".item-collection .items")
        product.forEach(item=>{
            if (fliter === "all") {
                item.style.display = "block"
            }
            else if(item.id === fliter){
                item.style.display = "block"
            }
            else{
                item.style.display = "none"
            }
        })
    }
x
    searchByName(){
        v.searchBox.addEventListener("keyup",(e)=>{
            let text = e.target.value.toLowerCase()
            
            let names = [...document.querySelectorAll("#name")]
            names.forEach(item=>{
                if (item.textContent.toLowerCase().includes(text)) {
                        item.parentElement.parentElement.style.display = "block"
                }else{
                    item.parentElement.parentElement.style.display = "none"
                }
            })
        })

    }


    addToCart(item){
        let cartItem = {...item, amount: 1}
        v.cart.push(cartItem)
        StorageCart.saveCartItem(v.cart)
        cart.addAmount(v.cart)
        cart.displayCart(v.cart)
        cart.showCart()
        setTimeout(()=>home.goTop(),1000)
        
    }
} 

export class Storage{
    static saveProduct(item){
        localStorage.setItem("products", JSON.stringify(item))

    }

    static getProduct(id){
        let product = JSON.parse(localStorage.getItem("products"))
        let item = product.find(function(e){
            return  e.id == id
        })
        ui.addToCart(item)
    }
}    

