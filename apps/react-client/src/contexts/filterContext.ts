import {create } from "zustand";



type filterState = {
    sortBy:string,
    setSortBy:(sortBy:string) =>void;
    priceRange:number[],
    setPriceRange:(priceRange:number[]) =>void;
    rating:number,
    setRating:(rating:number) =>void;
    removeOutOfStock:boolean,
    setRemoveOutOfStock:(removeOutOfStock:boolean) =>void;
    fastDeliveryOnly:boolean,
    setFastDeliveryOnly:(fastDeliveryOnly:boolean) =>void;
}


const useFilterStore = create<filterState>((set) => ({
    sortBy:"",
    setSortBy: (sortBy) => set(()=>({sortBy:sortBy})),
    priceRange:[0,10000],
    setPriceRange:(priceRange) => set(()=>({priceRange:priceRange})),
    rating:1,
    setRating:(rating) => set(()=>({rating:rating})),
    removeOutOfStock:false,
    setRemoveOutOfStock:(removeOutOfStock) =>set(()=>({removeOutOfStock:removeOutOfStock})),
    fastDeliveryOnly:false,
    setFastDeliveryOnly:(fastDeliveryOnly) => set(()=>({fastDeliveryOnly:fastDeliveryOnly})),
    
    
}))

export default useFilterStore;

