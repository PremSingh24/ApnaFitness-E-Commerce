import {create } from "zustand";
import { productType } from "common";

type cartType = {
    item:productType,
    quantity:number,
    _id:any,

}

type cartState ={
    cart:cartType[];
    setCart : (products:cartType[]) =>void;
    addToCart:(item:productType,_id:any)=>void;
    updateCart:(_id:any,quantity:number)=>void;
    removeFromCart:(_id:any)=>void;
}


const useCartStore = create<cartState>((set) => ({
    cart:[],
    setCart : (products) => set(()=>({cart:products})),
    addToCart: (item,_id) => set((state)=>({cart:[...state.cart,{item:item,quantity:1,_id:_id}]})),
    updateCart: (_id,quantity) => set((state)=>({cart:state.cart.map(cart=>cart._id===_id ? ({...cart,quantity:quantity}):cart)})),
    removeFromCart:(_id) => set((state)=>({cart:state.cart.filter((cart)=>cart._id !== _id)}))
    
}))

export default useCartStore;

