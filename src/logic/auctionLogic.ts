import { Observable, Subscription, filter, finalize, forkJoin, fromEvent, interval, map, take } from "rxjs";
import { Item } from "../models/Item";
import { updateRemainingSeconds } from "../view/itemDetailView";
import Swal from "sweetalert2";

const observableItems: Observable<number>[] = [];
let observableItem1: Observable<number> = null;
const itemsAuction : Item[] = [];

export function addItem (item: Item) {
    itemsAuction.push(item);
};

export function removeItem(itemToRemove: Item) {
    const indexToRemove = itemsAuction.indexOf(itemToRemove);
    if (indexToRemove !== -1) {
      itemsAuction.splice(indexToRemove, 1);
    }
  }
  

export function simulateAuction(item : Item, secondsLabel: HTMLElement,
     currentPriceWatch1: HTMLElement, watch1Div: HTMLElement,
      inputBid1: HTMLElement, button : HTMLButtonElement){

    const auctoinLenght: number = getAuctoinLenght();

    let botBiddingminutes : number [] = getBiddingMinutes(auctoinLenght);

    let bidOffer : Subscription=fromEvent(inputBid1, "input").pipe(
        map((ev : InputEvent) => (<HTMLInputElement>ev.target).value),
        filter((offer: string) => {

            const offerBid : number = parseInt(offer);
            let price : number = parseInt(currentPriceWatch1.textContent!);
        
            if(offerBid >= price) {
                return true;
            } else{
                button.disabled=true;
                return false;
            }
        })
    ).subscribe(() => {
        button.disabled=false;
    });

    const simulation =interval(1000).pipe(
        map(x => auctoinLenght-x),
        take(auctoinLenght),
        finalize(() => { endAuction(item, button, bidOffer, watch1Div);})
    );

    //observableItems.push(simulation);
    
    observableItem1=simulation;
    simulation.subscribe((seocnds : number) => {
        updateRemainingSeconds(seocnds, secondsLabel);
        
        if(seocnds === botBiddingminutes[0]) {
            botBidding(currentPriceWatch1, watch1Div, item);
            botBiddingminutes.shift();
        }
    });    
}

function getAuctoinLenght() : number {
    return Math.round(Math.random()*20 + 10);
}

function getBiddingMinutes(auctoinLenght : number) : number[] {

    let biddingNum = Math.round(Math.random()*10);

    if(biddingNum > 5) {
        biddingNum= biddingNum-5;
    }

    let biddingMinutes : number [] = [];

    for(var i =0; i<biddingNum; i++){
        biddingMinutes.push(Math.round(Math.random()*auctoinLenght));
    }

    biddingMinutes.sort((a ,b) => b -a);

    return biddingMinutes;
}

function botBidding(currentPrice: HTMLElement, watch1Div: HTMLElement, item : Item) {
    let price : number = parseInt(currentPrice.textContent!);
    price+=10;
    currentPrice.innerHTML=price.toString();
    item.buyer="Bot";
    watch1Div.style.backgroundColor= "#e65353";
    setTimeout(()=>{
        watch1Div.style.backgroundColor= "white";
    }, 250);
};

export function waitAuctionsEnd() {
    if (observableItems.length === 0) {
        return;
    }

  forkJoin(observableItems).subscribe(() => {
    //finishAuction();
    observableItems.length = 0;
    itemsAuction.forEach((item) => {item.buyer="";})
  });
}

function endAuction(item : Item,  button : HTMLButtonElement,
    bidOffer : Subscription, watch1Div: HTMLElement) {

    bidOffer.unsubscribe();
    button.disabled=true;

    if(item.buyer==="Bot") {
        watch1Div.style.backgroundColor= "#e65353";
    } else{
        watch1Div.style.backgroundColor= "#34eb49";
    }

    // if(itemsAuction.length===0){
    //     finishAuction();
    // }

    if(item.buyer==="User") {
        Swal.fire({
            icon: 'success',
            title: 'Congratulate',
            text: 'You bought: '+ item.title
          });
        itemsAuction.length=0;
    }
}

// function finishAuction() {
//     if(itemsAuction.length===1) {
//         if(itemsAuction[0].buyer==="User") {
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Congratulate',
//                 text: 'You bought: '+itemsAuction[0].title
//               })
//         }
//     } else {
//         if(itemsAuction[0].buyer==="User") {
//             if(itemsAuction[1].buyer==="User") {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Congratulate',
//                     text: 'You bought: '+itemsAuction[0].title + ', '+itemsAuction[1].title
//                   })
//             } else {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Congratulate',
//                     text: 'You bought: '+itemsAuction[0].title
//                   })
//             }
//         }
//     }
//     itemsAuction.length=0;
// }
