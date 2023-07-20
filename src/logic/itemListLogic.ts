import { debounceTime, filter, fromEvent, map, switchMap } from "rxjs";
import { getItems, getItemsByTitle } from "../controllers/Controller";
import { Item } from "../models/Item";
import { clearIteamList, drawCard } from "../view/itemListView";


export function handleSerach() {
    const search : HTMLInputElement = document.querySelector(".search");
    fromEvent(search, "input").pipe(
        debounceTime(500),
        map((event : InputEvent) => (<HTMLInputElement>event.target).value),
        filter((title : string) => {
            if(title.length>=3){
                return true
            }

            clearIteamList();
            loadItems();
        }),
        switchMap(title =>  getItemsByTitle(title))
    ).subscribe(items => handleSerachResult(items));
}

function loadItems() {
    getItems().subscribe((items) =>{
        handleSerachResult(items);
    })
}

function handleSerachResult(items : Item[]) {
    clearIteamList();

    const itemsDiv: HTMLElement = document.querySelector(".itemsDiv");
    items.forEach(item => {
        drawCard(itemsDiv, item);
    })
}