import * as v from "./var.js"

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "0x63s6f5ny89",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "Mi_m39ZK9W6WjNtfOaOyRky_8TX5u8of1XWz2QdhQNE"
  });
 
export class LoadProduct{
    async getProducts(){
        let contentful = await client.getEntries({
            content_type:
        })
        console.log(contentful);   
    }

}

class UI {

}

class Storage{

}