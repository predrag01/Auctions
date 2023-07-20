import { Observable, from } from "rxjs";
import { Item } from "../models/Item";
import { URL } from "../Constants";

export function getItem(title: string): Observable<Item>{
    const ret = fetch(URL+"/"+ title).then(response => {
        if(!response.ok)
        {
            throw new Error ("Item not found")
        }else{
            return response.json()
        }
    }).catch(err => console.error(err));
    return from(ret)
}


export function getItems(): Observable<Item[]>{
    const ret = fetch(URL).then(response => {
        if(!response.ok)
        {
            throw new Error ("Items not found")
        }else{
            return response.json()
        }
    }).catch(err => console.error(err));
    return from(ret)
}