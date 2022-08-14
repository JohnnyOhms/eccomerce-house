import * as v from "./var.js"

export class Hompage{
   scrollTrack(){
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        var scrolled = (winScroll / height) * 100;
        v.scrollBar.style.width = scrolled + "%"
        this.featuredScroll()
   }
   featuredScroll(){
        // 64.21108437087732
        // 64.80211081794195
   }
}