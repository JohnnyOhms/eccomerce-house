import * as v from "./var.js"

export class Hompage{
    constructor(rootEl){
       this.rootEl = rootEl
    }
   scrollTrack(){
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        var scrolled = (winScroll / height) * 100;
        v.scrollBar.style.width = scrolled + "%"
        // this.goTop(scrolled)
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
   footerIcons(){
    let icons = Array.from(v.footerIcons)
    icons.forEach(items=>{
        items.addEventListener("click",(e)=>{
            e.preventDefault();
            let target = e.target;
            if (target.classList.contains("fa-facebook")) {
                location.href =''
            }else if(target.classList.contains("fa-github")){
                location.href = ''
            }else if(target.classList.contains("fa-whatsapp")){
                // do something
            }else if(target.classList.contains("fa-twitter")){
                location.href = ''
            }
        })
    })

   }
   goTop(){
        let scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let topView = document.documentElement.scrollTop / scrollTotal
        console.log(topView);
        if (topView > 0.3) {
            v.toTop.style.display = "block"
        } else {
            v.toTop.style.display = "none"
        }
   }
  
}

