import { Observable, Subject, Subscription, filter, finalize, forkJoin, fromEvent, interval, map, merge, take } from "rxjs";
import { Item } from "../models/Item";
import { drawHistoryLabel, updateRemainingSeconds } from "../view/itemDetailView";
import Swal from "sweetalert2";

const observableItems: Observable<number>[] = [];
const itemsAuction : Item[] = [];

const biddingHistoryUser = new Subject<string>();
const biddingHistoryBot = new Subject<string>();

export function addItem (item: Item) {
    itemsAuction.push(item);
};

export function removeItem(itemToRemove: Item) {
    const indexToRemove = itemsAuction.indexOf(itemToRemove);
    if (indexToRemove !== -1) {
      itemsAuction.splice(indexToRemove, 1);
    }
  }
  
export function startSimulation(){
    if(itemsAuction.length === 0)
    {
        return
    }

    itemsAuction.forEach((auction) => simulateAuction(auction));

    waitAuctionsEnd();
    biddingHistory();
}

export function simulateAuction(item : Item){

    var inputBid1; 
    var currentPriceWatch1 : HTMLElement;
    var button: any;
    var watch1Div: HTMLElement;
    var secondsLabel: HTMLElement;
    if(item.wathc === 1)
    {
        inputBid1= document.querySelector(".inputBid1");
        currentPriceWatch1 = document.querySelector(".currentPriceWatch1");
        button= document.querySelector(".btnBidWatch1");
        watch1Div= document.querySelector(".watch1Div");
        secondsLabel =document.querySelector(".secondsWatch1");
    }
    else
    {
        inputBid1= document.querySelector(".inputBid2");
        currentPriceWatch1 = document.querySelector(".currentPriceWatch2");
        button= document.querySelector(".btnBidWatch2");
        watch1Div= document.querySelector(".watch2Div");
        secondsLabel =document.querySelector(".secondsWatch2");
    }

    const auctoinLenght: number = getAuctoinLenght();

    let botBiddingminutes : number [] = getBiddingMinutes(auctoinLenght);

    let bidOffer : Subscription=fromEvent(inputBid1, "input").pipe(
        map((ev : InputEvent) => (<HTMLInputElement>ev.target).value),
        filter((offer: string) => {

            const offerBid : number = parseInt(offer);
            let price : number = parseInt(currentPriceWatch1.textContent!);
        
            if(offerBid >= price) {
                button.disabled=false;
                biddingHistoryUser.next(`User bid: ` + offerBid);
                return true;
            } else{
                button.disabled=true;
                return false;
            }
        })
    )
    .subscribe(() => {
        button.disabled=false;
        // biddingHistoryUser.next(`User bid`);
    });

    const simulation =interval(1000).pipe(
        map(x => auctoinLenght-x),
        take(auctoinLenght),
        finalize(() => { endAuction(item, button, bidOffer, watch1Div);})
    );

    observableItems.push(simulation);
    simulation.subscribe((seocnds : number) => {
        updateRemainingSeconds(seocnds, secondsLabel);
        
        if(seocnds === botBiddingminutes[0]) {
            botBidding(currentPriceWatch1, watch1Div, item);
            botBiddingminutes.shift();
            const off: number= parseInt(currentPriceWatch1.textContent, 10)+10;
            biddingHistoryBot.next(`Bot bid: `+parseInt(currentPriceWatch1.textContent, 10));
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

  forkJoin(observableItems).subscribe(x => finishAuction());
}

export function biddingHistory(){
    merge(biddingHistoryUser, biddingHistoryBot).subscribe((historyEntry) => {
        drawHistoryLabel(historyEntry);
      });
}

function endAuction(item : Item,  button : HTMLButtonElement,
    bidOffer : Subscription, watch1Div: HTMLElement) {

    bidOffer.unsubscribe();
    button.disabled=true;
    item.wathc=0;

    if(item.buyer==="Bot") {
        watch1Div.style.backgroundColor= "#e65353";
    } else{
        watch1Div.style.backgroundColor= "#34eb49";
    }
}

function finishAuction() {
    if(itemsAuction.length===1) {
        if(itemsAuction[0].buyer==="User") {
            Swal.fire({
                icon: 'success',
                title: 'Congratulate',
                text: 'You bought: '+itemsAuction[0].title
              })
        }
        else 
        {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'You lose'
              })
        }
    }

    if(itemsAuction.length ===2)
    {
        if(itemsAuction[0].buyer==="User") {
            if(itemsAuction[1].buyer==="User") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulate',
                    text: 'You bought: '+itemsAuction[0].title + ', '+itemsAuction[1].title
                  })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulate',
                    text: 'You bought: '+itemsAuction[0].title
                  })
            }
        }
        else
        {
            if(itemsAuction[1].buyer==="User") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulate',
                    text: 'You bought: '+itemsAuction[1].title
                  })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: 'You lose'
                  })
            }
        }
    }

    itemsAuction.forEach((item) => {item.buyer="";});
    observableItems.length = 0;
    itemsAuction.length=0;
}

export function watch1(item: Item){
    item.wathc= 1;
}

export function watch2(item: Item){
    item.wathc= 2;
}