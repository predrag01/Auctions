import { Timestamp } from "rxjs";

export interface Item {
    id: string;
    title: string;
    description: string;
    image: string;
    startPrice: number;
    buyer: string;
}