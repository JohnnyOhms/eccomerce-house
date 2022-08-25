import * as v from "./var.js"

export class Hompage{
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
    try {
        let fetchData = await fetch("./packages/featured.json")
        let data = await fetchData.json()
        let featured = data.product;
        const result = featured.map(item => {
            const {name, title} = item.field;
            const image = item.field.image.fields.file.url;
            return {name, title, image}
        });
        return result;
    
    } catch (error) {
        console.log(error);
    }
   }

   displayFeatured(data){
        let display = ""
        data.forEach(item => {
            display += `
                <div class="featured-product">
                    <div class="product-item">
                        <div class="product-img">
                            <img src="${item.image}" alt="">
                        </div>
                        <p>${item.name}</p>
                        <p>${item.title}</p>
                        <div class="star">
                            <i class="fa-solid fa-star" style="color:#ffd700;"></i>
                            <i class="fa-solid fa-star" style="color:#ffd700;"></i>
                            <i class="fa-solid fa-star" style="color:#ffd700;"></i>
                            <i class="fa-solid fa-star" style="color:#ffd700;"></i>
                            <i class="fa-solid fa-star"></i>
                        </div> 
                    </div>
                </div>
             `
        });
        v.fatured_container.innerHTML = display;
   }

   carousel(){
       for(let i = 0; i < 1; i++){
            v.nextSlide.click();
        }
   }

   footerIcons(e){
            let target = e.target;
            if (target.classList.contains("fa-facebook")) {
                location.href = 'https://www.facebook.com/profile.php?id=100048603338804'

            }else if(target.classList.contains("fa-github")){
                location.href = 'https://github.com/JohnnyOhms'
                
            }else if(target.classList.contains("fa-whatsapp")){
                location.href ="http://api.whatsapp.com/send?phone=+2348142431028"

            }else if(target.classList.contains("fa-twitter")){
                location.href = 'https://twitter.com/ChinweikeJohn22?t=x-XbvshpiJSCvmfCahumWw&s=08'
            }
   }

   displayTopBtn(){
        let scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let topView = document.documentElement.scrollTop / scrollTotal
        if (topView > 0.3) {
            v.toTop.style.transform = "translatex(0)"
            v.toTop.style.opacity = "1"
        } else {
            v.toTop.style.transform = "translateX(105%)"
            v.toTop.style.opacity = "0"
        }
   }

   goTop(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
   }

   featuredProduct(){
        const scrollBtn = document.querySelector("#see-featured")
        const btnShop = document.querySelector(".btn-shop")
        scrollBtn.addEventListener("click",this.scrollDown())
        btnShop.addEventListener("click",this.scrollDown())
   }

   scrollDown(){
        const href = this.getAttribute("href");
        document.querySelector(href).scrollIntoView({
            behavior : "smooth"
        })
   }

}



