import * as moment from "moment";

export const displayPrice = (price: number): string => {
    return `$ ${(price / 100)}`;
}

export const setPrice = (price: string): number => {
    return parseFloat(price) * 100;
}

export const displayDate = (timestamp: number): string => {
    return moment.unix(timestamp/1000).format("MM/DD/YYYY HH:mm")
}