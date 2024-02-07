// import React from "react";
// import { Snackbar } from "@mui/material"
// import MuiAlert, {AlertProps } from '@mui/material/Alert';
// import { useSnackBarStore } from "../contexts";



// export const SnackBar = () => {
//     const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//         props,
//         ref,
//       ) {
//         return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//     });

//     return (
        
//             <Snackbar open={useSnackBarStore((state)=>state.open)} autoHideDuration={3000} onClose={useSnackBarStore((state)=>state.toggleSnackBar)} anchorOrigin={{ vertical:"bottom", horizontal:"right" }}>
//                 <Alert onClose={useSnackBarStore((state)=>state.toggleSnackBar)} severity={useSnackBarStore((state)=>state.severity)} sx={{ width: '100%' }}>
//                     {useSnackBarStore((state)=>state.message)}
//                 </Alert>
//             </Snackbar>
//     )

// }