import {create } from "zustand";
import { productType } from "common";


type productsState ={
    allProducts:productType[];
    initialProducts:productType[];
    products:productType[];
    setAllProducts:(products:productType[])=>void;
    setInitialProducts:(products:productType[])=>void;
    setProducts:(products:productType[])=>void;
}


const useProductStore = create<productsState>((set) => ({
    allProducts:[],
    initialProducts:[],
    products: [],
    setAllProducts:(products) => set(()=>({allProducts:products})),
    setInitialProducts:(products) => set(()=>({initialProducts:products})),
    setProducts:(products) => set( ()=>({products:products})),
    
}))

export default useProductStore;

