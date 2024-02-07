import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, Divider } from '@mui/material';
import useCartStore from '../contexts/cart.context';










const CheckOutForm = () =>{
    const cartContext = useCartStore((state)=>state.cart);

    let cartPrice = 0;
    cartContext.map(obj=>obj.item.currentPrice ? cartPrice +=obj.item.currentPrice*obj.quantity :cartPrice+=0)



    return (
    <Paper elevation={5}
      sx={{
        display:{xs:"none",sm:"block"},
        p: 4,
        margin: 'auto',
        maxWidth: 400,
        flexGrow: 1,
        marginBottom:"2rem",
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          
      }}
    >
      <Grid container spacing={2} >
        <Grid item  xs={12} md={12}>
            <Typography variant='h5' color={"black"} 
            sx={{display:"flex",justifyContent:"center",
            alignItems:"center",border:"2px solid black"}}
            >
                Cart Summary
            </Typography>
        </Grid>

        <Grid item sx={{display:"flex",justifyContent:"start",alignItems:"flex-start"}} xs={6} md={6}>
            <Typography variant='h6' color={"black"} 
            sx={{display:"flex",justifyContent:"start",
            alignItems:"start"}}
            >Price ({cartContext.length} Items)</Typography>

            
            
        </Grid>
        <Grid item sx={{display:"flex",justifyContent:"end",alignItems:"flex-end"}} xs={6} md={6}>
        <Typography variant='h6' color={"black"} 
            sx={{display:"flex",justifyContent:"end",
            alignItems:"flex-end"}}
            >
                ₹{cartPrice}
            </Typography>


        </Grid>
        
        
        <Grid item sx={{display:"flex",justifyContent:"start",alignItems:"flex-start"}} xs={6} md={6}>
            <Typography variant='h6' color={"black"} 
                sx={{display:"flex",justifyContent:"start",
                alignItems:"start"}}
                >
                    Discount
            </Typography>
        </Grid>
        <Grid item sx={{display:"flex",justifyContent:"end",alignItems:"flex-end"}} xs={6} md={6}>

            <Typography variant='h6' color={"black"} 
            sx={{display:"flex",justifyContent:"end",
            alignItems:"flex-end"}}
            >
                ₹ 0
            </Typography>
            
        </Grid>
        <Grid item sx={{display:"flex",justifyContent:"start",alignItems:"flex-start"}} xs={6} md={6}>
            <Typography variant='h6' color={"black"} 
                sx={{display:"flex",justifyContent:"start",
                alignItems:"start"}}
                >
                    Delivery Charge
            </Typography>
        </Grid>
        <Grid item sx={{display:"flex",justifyContent:"end",alignItems:"flex-end"}} xs={6} md={6}>

            <Typography variant='h6' color={"black"} 
            sx={{display:"flex",justifyContent:"end",
            alignItems:"flex-end"}}
            >
               ₹ 45
            </Typography>
            
        </Grid>
        <Divider sx={{width:"100%"}} />
        <Grid item sx={{display:"flex",justifyContent:"start",alignItems:"flex-start"}} xs={6} md={6}>
            <Typography variant='h6' color={"black"} 
                sx={{display:"flex",justifyContent:"start",
                alignItems:"start"}}
                >
                   Total Amount
            </Typography>
        </Grid>
        
        <Grid item sx={{display:"flex",justifyContent:"end",alignItems:"flex-end"}} xs={6} md={6}>
        

            <Typography variant='h6' color={"black"} 
            sx={{display:"flex",justifyContent:"end",
            alignItems:"flex-end"}}
            >
               ₹{cartPrice +45}
            </Typography>
            
        </Grid>
        <Divider sx={{width:"100%"}} />

    

        <Button variant='contained' fullWidth sx={{marginTop:"20px"}}>Proceed To Check Out</Button>
      </Grid>
      
    </Paper>
    
    



    )
}

export default CheckOutForm;