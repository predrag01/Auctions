import { addItem, removeItem, simulateAuction, startSimulation, waitAuctionsEnd, watch1, watch2 } from "../logic/auctionLogic";
import { Item } from "../models/Item";
import { drawDiv, drawImg, drawLabel } from "../pattern";

export function drawCenter() {
    const mainDiv: HTMLElement =document.querySelector(".mainDiv");
    const centerDiv=drawDiv(mainDiv, "centerDiv");

    const mainTitleDiv= drawDiv(centerDiv, "mainTitleDiv");
    
    drawLabel(mainTitleDiv, "mainTitle", "Live Auctions");
    const btnWatch1Div = drawDiv(mainTitleDiv, "btnWatch1Div");
    const btnwatch1 = document.createElement("button");
    btnwatch1.className="watch";
    btnwatch1.innerHTML="Start";
    btnwatch1.onclick = () => {
        startSimulation();
    };
    btnWatch1Div.appendChild(btnwatch1);
    
    const detailsDiv=drawDiv(centerDiv, "detailsDiv");
    
    const watchsDiv=drawDiv(centerDiv, "watchsDiv");
    const watch1Div=drawDiv(watchsDiv, "watch1Div");
    const watch1TitleDiv=drawDiv(watch1Div, "watchTitleDiv");
    drawLabel(watch1TitleDiv, "watchTitle", "Watch 1");
    
    const watch2Div=drawDiv(watchsDiv, "watch2Div");
    const watch2TitleDiv=drawDiv(watch2Div, "watchTitleDiv");
    drawLabel(watch2TitleDiv, "watchTitle", "Watch 2");
}

export function drawDetails(item : Item) {
    clearDetails();

    const detailsDiv : HTMLElement =document.querySelector(".detailsDiv");
    
    const singleItemDiv=drawDiv(detailsDiv, "singleItemDiv");

    const imgDiv=drawDiv(singleItemDiv, "imgDetailsDiv");
    drawImg(imgDiv, item, "imgDetails");

    const descDiv = drawDiv(singleItemDiv, "descDiv");

    const titleItemDiv=drawDiv(descDiv, "titleItemDiv");
    drawLabel(titleItemDiv, "titleItemDesc", item.title);
    const btnX = document.createElement("button");
    btnX.className="btnX";
    btnX.innerHTML="X";
    btnX.onclick = () => {
        clearDetails();
    }
    titleItemDiv.appendChild(btnX);

    const descItemDiv = drawDiv(descDiv, "descItemDiv");
    drawLabel(descItemDiv, "descItemDesc", item.description);

    const startingPriceItemDiv = drawDiv(descDiv, "startingPriceItemDiv");
    drawLabel(startingPriceItemDiv, "startingPriceItemLab", "Starting price: ");
    drawLabel(startingPriceItemDiv, "price", item.startPrice + "€");

    const bottonsDiv =drawDiv(descDiv, "bottonsDiv");

    const btnWatch1Div = drawDiv(bottonsDiv, "btnWatch1Div");
    const btnwatch1 = document.createElement("button");
    btnwatch1.className="watch";
    btnwatch1.innerHTML="Watch 1";
    btnwatch1.onclick = () => {
        drawWatch1(item);
        addItem(item);
        watch1(item);
    };
    btnWatch1Div.appendChild(btnwatch1);

    const btnWatch2Div = drawDiv(bottonsDiv, "btnWatch2Div");
    const btnwatch2 = document.createElement("button");
    btnwatch2.className="watch";
    btnwatch2.innerHTML="Watch 2";
    btnwatch2.onclick = () => {
        drawWatch2(item);
        addItem(item);
        watch2(item);
    };
    btnWatch2Div.appendChild(btnwatch2);
}

export function clearDetails()
{
    const singleItemDiv =document.querySelector(".singleItemDiv");
    if(singleItemDiv){
        singleItemDiv.remove();
    }
}

function drawWatch1(item : Item) {
    clearWatch1();

    const watch1Div : HTMLElement = document.querySelector(".watch1Div");

    const singleWatch1Div = drawDiv(watch1Div, "singleWatch1Div");

    const titleItemWatch1Div = drawDiv(singleWatch1Div, "titleItemWatch1Div");
    drawLabel(titleItemWatch1Div, "titleItemWatch1Label", item.title);
    const btnX = document.createElement("button");
    btnX.className="btnX";
    btnX.innerHTML="X";
    btnX.onclick = () => {
        clearWatch1();
        removeItem(item);
    }
    titleItemWatch1Div.appendChild(btnX);
    
    const detailsWatch1 = drawDiv(singleWatch1Div, "detailsWatch1");
    const imgWatch1Div = drawDiv(detailsWatch1, "imgWatch1Div");
    drawImg(imgWatch1Div, item, "imgWatch1");

    const additionalInfoDiv = drawDiv(detailsWatch1, "additionalInfoDiv");
    
    const startingPriceDiv = drawDiv(additionalInfoDiv, "startingPriceDiv");
    drawLabel(startingPriceDiv, "inforamtionLab", "Starting price: "+ item.startPrice);
    drawLabel(startingPriceDiv, "inforamtionLab", "€");

    const currentPriceDiv = drawDiv(additionalInfoDiv, "currentPriceDiv");
    drawLabel(currentPriceDiv, "inforamtionLab", "Current price: ");
    drawLabel(currentPriceDiv, "currentPriceWatch1", item.startPrice.toString());
    drawLabel(currentPriceDiv, "inforamtionLabValue", "€");

    const remainingTimeDiv = drawDiv(additionalInfoDiv, "remainingTimeDiv");
    drawLabel(remainingTimeDiv, "inforamtionLab", "Remaining time: ");
    drawLabel(remainingTimeDiv, "secondsWatch1", "");
    drawLabel(remainingTimeDiv, "inforamtionLabValue", "s");

    const biddingDiv = drawDiv(singleWatch1Div, "biddingDiv");
    const inputBid1= document.createElement("input");
    inputBid1.className="inputBid1";
    inputBid1.type="number";
    inputBid1.min="0";
    inputBid1.step="10";
    inputBid1.value=item.startPrice.toString();
    biddingDiv.appendChild(inputBid1);

    const bidBtn =document.createElement("button");
    bidBtn.className="btnBidWatch1";
    bidBtn.innerHTML="Bid";
    bidBtn.disabled=false;
    bidBtn.onclick = () => {
        item.buyer="User";
        const currentPriceWatch1 : HTMLElement =document.querySelector(".currentPriceWatch1");
        currentPriceWatch1.textContent=inputBid1.value;

        watch1Div.style.backgroundColor= "#34eb49";
        setTimeout(()=>{
            watch1Div.style.backgroundColor= "white";
        }, 250);
    };
    biddingDiv.appendChild(bidBtn);

}

function clearWatch1() {
    const singleWatch1Div =document.querySelector(".singleWatch1Div");
    if(singleWatch1Div){
        singleWatch1Div.remove();
    }
    const watch1Div : HTMLElement =document.querySelector(".watch1Div");
    watch1Div.style.backgroundColor= "white";
}

function drawWatch2(item : Item) {
    clearWatch2();

    const watch2Div : HTMLElement = document.querySelector(".watch2Div");

    const singleWatch2Div = drawDiv(watch2Div, "singleWatch2Div");

    const titleItemWatch1Div = drawDiv(singleWatch2Div, "titleItemWatch1Div");
    drawLabel(titleItemWatch1Div, "titleItemWatch1Label", item.title);
    const btnX = document.createElement("button");
    btnX.className="btnX";
    btnX.innerHTML="X";
    btnX.onclick = () => {
        clearWatch2();
        removeItem(item);
    }
    titleItemWatch1Div.appendChild(btnX);
    
    const detailsWatch1 = drawDiv(singleWatch2Div, "detailsWatch1");
    const imgWatch1Div = drawDiv(detailsWatch1, "imgWatch1Div");
    drawImg(imgWatch1Div, item, "imgWatch1");

    const additionalInfoDiv = drawDiv(detailsWatch1, "additionalInfoDiv");
    
    const startingPriceDiv = drawDiv(additionalInfoDiv, "startingPriceDiv");
    drawLabel(startingPriceDiv, "inforamtionLab", "Starting price: "+ item.startPrice);
    drawLabel(startingPriceDiv, "inforamtionLab", "€");

    const currentPriceDiv = drawDiv(additionalInfoDiv, "currentPriceDiv");
    drawLabel(currentPriceDiv, "inforamtionLab", "Current price: ");
    drawLabel(currentPriceDiv, "currentPriceWatch2", item.startPrice.toString());
    drawLabel(currentPriceDiv, "inforamtionLabValue", "€");

    const remainingTimeDiv = drawDiv(additionalInfoDiv, "remainingTimeDiv");
    drawLabel(remainingTimeDiv, "inforamtionLab", "Remaining time: ");
    drawLabel(remainingTimeDiv, "secondsWatch2", "");
    drawLabel(remainingTimeDiv, "inforamtionLabValue", "s");

    const biddingDiv = drawDiv(singleWatch2Div, "biddingDiv");
    const inputBid2= document.createElement("input");
    inputBid2.className="inputBid2";
    inputBid2.type="number";
    inputBid2.min="0";
    inputBid2.step="10";
    inputBid2.value=item.startPrice.toString();
    biddingDiv.appendChild(inputBid2);

    const bidBtn =document.createElement("button");
    bidBtn.className="btnBidWatch2";
    bidBtn.innerHTML="Bid";
    bidBtn.disabled=false;
    bidBtn.onclick = () => {
        item.buyer="User";
        const currentPriceWatch2 : HTMLElement =document.querySelector(".currentPriceWatch2");
        currentPriceWatch2.textContent=inputBid2.value;

        watch2Div.style.backgroundColor= "#34eb49";
        setTimeout(()=>{
            watch2Div.style.backgroundColor= "white";
        }, 250);
    };
    biddingDiv.appendChild(bidBtn);
}

function clearWatch2() {
    const singleWatch2Div =document.querySelector(".singleWatch2Div");
    if(singleWatch2Div){
        singleWatch2Div.remove();
    }

    const watch2Div : HTMLElement =document.querySelector(".watch2Div");
    watch2Div.style.backgroundColor= "white";
}

export function updateRemainingSeconds(seconds : number, secondsLabel: HTMLElement) {
    secondsLabel.innerHTML=seconds.toString();
}

export function drawBiddingHistory()
{
    const centerDiv: HTMLElement =document.querySelector(".centerDiv");
    const historyDiv=drawDiv(centerDiv, "historyDiv");

    const historyTitleDiv= drawDiv(historyDiv, "historyTitleDiv");
    
    drawLabel(historyTitleDiv, "historyTitle", "Bidding history");

    const historyValueDiv = drawDiv(historyDiv, "historyValueDiv");
}

export function drawHistoryLabel(value: string){
    const historyValueDiv: HTMLElement =document.querySelector(".historyValueDiv");
    drawLabel(historyValueDiv, "historyValue", value);
}