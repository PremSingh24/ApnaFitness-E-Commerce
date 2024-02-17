import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme,ThemeProvider  } from '@mui/material/styles';
import { Button, Container, Grid, Stack, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import useCartStore from '../contexts/cart.context';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartProduct from '../components/cartProduct';
import CheckOutForm from '../components/checkoutForm';


const theme = createTheme();
 

const CartPage = () =>  {
    const cart = useCartStore((state)=>state.cart)



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Container maxWidth="xl" sx={{position:"relative",marginTop:{xs:"6rem",md:"4.5rem"},mb:{xs:"4rem",sm:"1rem",md:"2rem"}}}>

      <Stack direction={"row"} gap={1} padding={"5px"} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Typography color={"black"} variant='h3' textAlign={"center"} paddingTop={"10px"}>My Cart</Typography>
      <ShoppingCartIcon sx={{fontSize:"2.6rem",marginTop:"10px"}} color='info'/>

      </Stack>
      
      

      <Toolbar/>
      {cart.length > 0 ?

      
        <Grid container spacing={2} sx={{display:"flex",justifyContent:"center",}}>
          <Grid item xs={12} md={7} lg={5} sx={{width:"50%"}}>
            <CartProduct/>
          </Grid> 
          <Grid item xs={12} md={4} >
            <CheckOutForm/>
          </Grid>
        </Grid>
        

      
      :
        <Stack direction={"column"} gap={1} padding={"5px"} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Typography color={"black"} variant='h4' textAlign={"center"} padding={"10px"} marginTop={"60px"}>Cart is Empty</Typography>
          <NavLink to={"/AllProducts"}><Button variant='contained' >Continue Shopping</Button></NavLink>
        </Stack>
      }

    </Container>
    </ThemeProvider>
  )
}


export default CartPage;