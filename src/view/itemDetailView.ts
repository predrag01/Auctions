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

