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
        Storage.saveProduct(items)
    }

    startApp(){
        v.showCart.addEventListener("click",this.showCart)
        v.closeCart.addEventListener("click",this.hideCart)
        Storage.getCartItem()
        this.cartLogic()
        
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

    searchBy(){
        
        if (v.searchCategory.checked == true) {
            // console.log('secondBox');
            console.log(v.searchName);
        }
    }

    addToCart(item){
        let cartItem = {...item, amount: 1}
        v.cart.push(cartItem)
        Storage.saveCartItem(v.cart)
        this.addAmount(v.cart)
        this.displayCart(v.cart)
        this.showCart()
    }

    addAmount(cart){
        let totalAmount = 0
        let totalItem = 0
        cart.map(item=>{
            totalAmount += item.price * item.amount;
            totalItem += item.amount;
        })
        // console.log(cart);
        // console.log(totalAmount);
        v.count.innerText = totalItem;
        v.cartTotal.innerText = 'TOTAL: $'+ parseFloat(totalAmount.toFixed(3))
    }

    displayCart(items){
        let display ="";
        items.forEach(item=>{
            display += `<div class="cart-item">
                <img src="${item.image}"
                    alt="">
                <div class="cart-items">
                    <p class="name">${item.name}</p>
                    <p class="price">$${item.price}</p>
                    <span id="trash"><i class="fa-solid fa-trash-can"></i></span>
                    <div class="item-amount mt-1">
                        <i class="fa-solid fa-plus"></i>
                        <span class="amount">${item.amount}</span>
                        <i class="fa-solid fa-minus"></i>
                    </div>
                </div>
            </div>`
        })
        v.cartItems.innerHTML = display;        
    }

    showCart(){
        v.cartOverlay.style.display = "block"
        v.cartSection.style.transform = "translateX(0%)"
    }

    hideCart(){
        v.cartSection.style.transform = "translateX(120%)"
        v.cartOverlay.style.display = "none"
    }

    populateCart(cart){
        this.addAmount(cart)
        this.displayCart(cart)
    }

    cartLogic(){
        v.clearCartItem.addEventListener("click",()=>{
            this.clearCart()
        })
    }

    clearCart(){
        let cartItem = v.cart.map(item=>item.id)
        cartItem.forEach(id=>this.removeItem(id))
    }
    
    removeItem(id){
      let flit = v.cart.filter(function(item){
        return item.id !== id   
    })
       Storage.saveCartItem(flit)
       this.addAmount(flit)

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

    static saveCartItem(cart){
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    static getCartItem(){
        let cartValue = JSON.parse(localStorage.getItem("cart")) || []
        v.cart.push(...cartValue)
        ui.populateCart(v.cart)
    }
}    

