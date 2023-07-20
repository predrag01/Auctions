import { Item } from "../models/Item";
import { getItems } from "../controllers/Controller";
import { drawDiv, drawLabel } from "../../pattern";

export function drawCard(parent: HTMLElement, item: Item){
    const div =drawDiv(parent, "item-div");
    const imgDiv=drawDiv(div, "imgDiv");
    const img=document.createElement("img");
    img.src="./images/"+item.image;
    img.className="img"
    imgDiv.appendChild(img);
    const titleDiv=drawDiv(div, "titleDiv");
    drawLabel(titleDiv, "itemTitle", item.title);
    div.onclick = () => {
        console.log(item.title);
    }
}

function drawItems(parent : HTMLElement){
    getItems().subscribe(items => {
        items.forEach(item => {
            drawCard(parent, item);
        })
    })
};

export function drawItemList() {
    const itemsDiv=drawDiv(document.body, "itemsDiv");
    const labDiv=drawDiv(itemsDiv, "labelDiv");
    drawLabel(labDiv, "items", "Items");

    const searchDiv=drawDiv(itemsDiv, "searchDiv");
    const search=document.createElement("input");
    search.className="search";
    search.placeholder="Search";
    searchDiv.appendChild(search);
    drawItems(itemsDiv);
}

export function clearIteamList() {
    const divs = document.querySelectorAll(".item-div");
    if(divs.length===0){
        return;
    }

    divs.forEach(pair => pair.remove());
}