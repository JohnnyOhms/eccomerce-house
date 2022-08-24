import { cart } from "./app1.js"
import * as v from "./var.js"

//  cart functionality

export class Cart{

    startApp(){
        v.showCart.addEventListener("click",this.showCart)
        v.closeCart.addEventListener("click",this.hideCart)
        StorageCart.getCartItem()
        this.cartLogic()  
    }

    populateCart(cart){
        this.addAmount(cart)
        this.displayCart(cart)
        this.emptyCart()
    }

    emptyCart(){
        if(v.cartItems.childNodes.length == 0){
            let empty_cart = document.createElement("p")
            empty_cart.setAttribute("id", "empty-cart")
            empty_cart.innerText = "Navigate to the shop page to see avaliable products";
            v.cartItems.appendChild(empty_cart)
        }
    }

    addAmount(cart){
        let totalAmount = 0
        let totalItem = 0
        cart.map(item=>{
            totalAmount += item.price * item.amount
            totalItem += item.amount
        })
        v.count.innerText = totalItem
        v.cartTotal.innerHTML = `TOTAL: $${parseFloat(totalAmount.toFixed(2))}`
    }

    displayCart(cart){
        let display = ''
        cart.forEach(item => {
            display += `<div class="cart-item">
                <img src="${item.image}"
                    alt="">
                <div class="cart-items">
                    <p class="name">${item.name}</p>
                    <p class="price">$${item.price}</p>
                    <span id="trash"><i class="fa-solid fa-trash-can" data-id="${item.id}"></i></span>
                    <div class="item-amount mt-1">
                        <i class="fa-solid fa-plus" data-id="${item.id}"></i>
                        <span class="amount">${item.amount}</span>
                        <i class="fa-solid fa-minus" data-id="${item.id}"></i>
                    </div>
                </div>
            </div>`
        })
        v.cartItems.innerHTML = display;
    }

    showCart(){
        v.cartOverlay.style.visibility = 'visible'
        v.cartSection.style.display = "block"
        setTimeout(()=>{
            v.cartSection.classList.add("show-cart")
        }, 300)
    }

    hideCart(){
        v.cartOverlay.style.visibility = 'hidden'
        v.cartSection.classList.remove("show-cart")
        setTimeout(()=>{
            v.cartSection.style.display = "none"
        }, 300)
    }

    cartLogic(){
        v.clearCartItem.addEventListener("click",()=>{
            this.clearCart()
        })

        v.cartSection.addEventListener("click",(e)=>{
            let target = e.target;
            let id = target.dataset.id;

            if(target.classList.contains("fa-plus")){
                let addAmount = v.cart.find(item=>item.id == id)
                addAmount.amount++;
                target.nextElementSibling.innerText = addAmount.amount;
                this.addAmount(v.cart)
                StorageCart.saveCartItem(v.cart); 
            }
            else if (target.classList.contains("fa-minus")){
                let minusAmount = v.cart.find(item=>item.id == id)
                minusAmount.amount --;
                if (minusAmount.amount < 1) {
                    target.parentElement.parentElement.parentElement.remove()
                   this.removeItem(id)
                   this.addAmount(v.cart)
                   StorageCart.saveCartItem(v.cart)

                }else{
                    target.previousElementSibling.innerText = minusAmount.amount;
                    this.addAmount(v.cart)
                    StorageCart.saveCartItem(v.cart)
                   
                }
            }
            else if(target.classList.contains("fa-trash-can")){
                target.parentElement.parentElement.parentElement.remove()
                this.removeItem(id)
                this.addAmount(v.cart)
                StorageCart.saveCartItem(v.cart)
            }
        })
    }

    clearCart(){
        let cartItem = v.cart.map(item=>item.id)
        cartItem.map(id=>this.removeItem(id))

        while(v.cartItems.hasChildNodes()){
            v.cartItems.removeChild(v.cartItems.firstChild)
        }
        this.addAmount(v.cart)
        StorageCart.saveCartItem(v.cart)
        this.emptyCart()
        this.hideCart()
        
    }

    removeItem(id){
        let removeItem = v.cart.filter(function(e){
            return e.id != id
        })
        v.cart.splice(0, v.cart.length, ...removeItem)
    }
}

export class StorageCart{
    static saveCartItem(cart){
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    static getCartItem(){
        let cartValue = JSON.parse(localStorage.getItem("cart")) || []
        v.cart.push(...cartValue)
        cart.populateCart(v.cart)
    }
}   