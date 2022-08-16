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
        let product = product.forEach((item, i) => {
            item.id = i + 1;
        });
        ui.displayProduct(product)
    }
}

export class UI {
    displayProduct(items){
        console.log(items);
    }
}

export class Storage{
    static saveProduct(item){
        localStorage.setItem("products", JSON.stringify(item))
    }
}