
export const displayPrice = (price: number): string => {
    return `$ ${(price / 100)}`;
}

export const setPrice = (price: string): number => {
    return parseFloat(price) * 100;
}