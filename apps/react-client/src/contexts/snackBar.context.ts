// import { AlertColor } from "@mui/material";
// import {create } from "zustand";




// type snackBarState ={
//     open:boolean;
//     severity:AlertColor|undefined;
//     message:string;
//     showSnackBar:(severity:AlertColor|undefined,message:string)=>void;
//     toggleSnackBar:()=>void;
// }

// export const useSnackBarStore = create<snackBarState>((set) => ({
//     open: false,
//     severity:undefined,
//     message:"",
//     showSnackBar: (severity,message) => set(() => ({ open: true,severity:severity,message:message})),
//     toggleSnackBar:(_event?: React.SyntheticEvent | Event, reason?: string)=> {if (reason === "clickaway"){return;} set(() => ({open:false}))}
    
// }))