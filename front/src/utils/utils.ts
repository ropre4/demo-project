
export const displayPrice = (price: number): number => {
    return price / 100;
}

export const setPrice = (price: string): number => {
    return parseFloat(price) * 100;
}