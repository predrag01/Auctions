import { Subscription, filter, fromEvent, interval, map, take } from "rxjs";
import { Item } from "../models/Item";
import { updateRemainingSeconds } from "../view/itemDetailView";

export function simulateAuction(item : Item, secondsLabel: HTMLElement, currentPriceWatch1: HTMLElement, watch1Div: HTMLElement, inputBid1: HTMLElement){
    const auctoinLenght: number = getAuctoinLenght();

    let botBiddingminutes : number [] = getBiddingMinutes(auctoinLenght);

    let bidOffer : Subscription=fromEvent(inputBid1, "input").pipe(
        map((ev : InputEvent) => (<HTMLInputElement>ev.target).value),
        filter((offer: string) => {

            const offerBid : number = parseInt(offer);
            let price : number = parseInt(currentPriceWatch1.textContent!);

            const btnBidWatch1 : HTMLElement =document.querySelector(".btnBidWatch1");
        
            if(offerBid >= price) {
                btnBidWatch1.setAttribute("disabled", "false");
                return true;
            } else{
                btnBidWatch1.setAttribute("disabled", "true");
                return false;
            }
        })
    ).subscribe((userOffer : string) => {
        const btnBidWatch1 : HTMLElement =document.querySelector(".btnBidWatch1");
        btnBidWatch1.setAttribute("disabled", "false");
        console.log(userOffer);

        const currentPriceWatch1 : HTMLElement =document.querySelector(".currentPriceWatch1");
        currentPriceWatch1.textContent=userOffer;
    });

    interval(1000).pipe(
        map(x => auctoinLenght-x),
        take(auctoinLenght),
    ).subscribe((seocnds : number) => {
        updateRemainingSeconds(seocnds, secondsLabel);
        
        if(seocnds === botBiddingminutes[0]) {
            botBidding(currentPriceWatch1, watch1Div);
            botBiddingminutes.shift();
        }
        
        if(seocnds===1)
        {
            bidOffer.unsubscribe();
        }
    });

    
}

function getAuctoinLenght() : number {
    return Math.round(Math.random()*20);
}

function getBiddingMinutes(auctoinLenght : number) : number[] {

    let biddingNum = Math.round(Math.random()*10);

    // if(biddingNum > 5) {
    //     biddingNum= biddingNum-5;
    // }

    let biddingMinutes : number [] = [];

    for(var i =0; i<biddingNum; i++){
        biddingMinutes.push(Math.round(Math.random()*auctoinLenght));
    }

    biddingMinutes.sort((a ,b) => b -a);

    return biddingMinutes;
}

function botBidding(currentPrice: HTMLElement, watch1Div: HTMLElement) {
    let price : number = parseInt(currentPrice.textContent!);
    price+=10;
    currentPrice.innerHTML=price.toString();
    watch1Div.style.backgroundColor= "#e65353";
    setTimeout(()=>{
        watch1Div.style.backgroundColor= "white";
    }, 250);
}