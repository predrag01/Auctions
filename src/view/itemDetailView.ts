import { Item } from "../models/Item";
import { drawDiv, drawLabel } from "../pattern";

export function drawCenter() {
    const mainDiv: HTMLElement =document.querySelector(".mainDiv");
    const centerDiv=drawDiv(mainDiv, "centerDiv");

    const mainTitleDiv= drawDiv(centerDiv, "mainTitleDiv");
    drawLabel(mainTitleDiv, "mainTitle", "Live Auctions");
    const detailsDiv=drawDiv(centerDiv, "detailsDiv");
    const watcshDiv=drawDiv(centerDiv, "watchsDiv");
    const watcs1Div=drawDiv(watcshDiv, "watch1Div");
    const watcs2Div=drawDiv(watcshDiv, "watch2Div");
}

export function drawDetails(item : Item) {
    clearDetails();

    const detailsDiv : HTMLElement =document.querySelector(".detailsDiv");
    
    const singleItemDiv=drawDiv(detailsDiv, "singleItemDiv");

    const imgDiv=drawDiv(singleItemDiv, "imgDetailsDiv");
    const img = document.createElement("img");
    img.className="imgDetails"
    img.src= "./images/"+item.image;
    imgDiv.appendChild(img);

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
    btnWatch1Div.appendChild(btnwatch1);

    const btnWatch2Div = drawDiv(bottonsDiv, "btnWatch2Div");
    const btnwatch2 = document.createElement("button");
    btnwatch2.className="watch";
    btnwatch2.innerHTML="Watch 2";
    btnWatch2Div.appendChild(btnwatch2);
}

export function clearDetails()
{
    const singleItemDiv =document.querySelector(".singleItemDiv");
    if(singleItemDiv){
        singleItemDiv.remove();
    }
}

