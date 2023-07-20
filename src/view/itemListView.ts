import { Item } from "../models/Item";
import { getItems } from "../controllers/Controller";
import { drawDiv, drawLabel } from "../../pattern";

function drawCard(parent: HTMLElement, item: Item){
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

export function drawItems(){
    const moviesDiv=drawDiv(document.body, "itemsDiv");
    drawLabel(moviesDiv, "items", "Items");
    getItems().subscribe(items => {
        items.forEach(item => {
            drawCard(moviesDiv, item);
        })
    })
};