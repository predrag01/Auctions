import { Item } from "./models/Item";

export function drawDiv(parent: HTMLElement, className: string) : HTMLElement{
    const div=document.createElement("div");
    div.className=className;
    parent.appendChild(div);
    return div;
}

export function drawLabel(parent: HTMLElement, className?: string, title?: string) : HTMLElement{
    const label=document.createElement("label");
    label.className=className;
    label.innerHTML=title;
    parent.appendChild(label);
    return label;
}

export function drawImg(imgDiv : HTMLElement, item : Item, className : string) {
    const img = document.createElement("img");
    img.className=className;
    img.src= "./images/"+item.image;
    imgDiv.appendChild(img);
}