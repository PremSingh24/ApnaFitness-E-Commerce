import {create } from "zustand";
import { productType } from "common";



type wishlistState ={
    wishlist:productType[];
    setWishlist:(products:productType[])=>void;
    addToWishlist:(product:productType)=>void;
    removeFromWishlist:(_id:any)=>void;
}


const useWishlistStore = create<wishlistState>((set) => ({
    wishlist:[],
    setWishlist:(products) => set(()=>({wishlist:products})),
    addToWishlist: (product) => set((state)=>({wishlist:[...state.wishlist,product]})),
    removeFromWishlist:(_id) => set((state)=>({wishlist:state.wishlist.filter((product)=>product._id !== _id)}))
    
}))

export default useWishlistStore;

