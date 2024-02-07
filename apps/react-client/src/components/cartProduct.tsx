import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import useCartStore from '../contexts/cart.context';
import updateCartService from '../services/cartServices/updateCartQty.service';
import removeFromCartService from '../services/cartServices/removeFromCart.service';
import { NavLink } from 'react-router-dom';
import { toast } from 'sonner';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CartProduct = () => {

    const cartContext = useCartStore((state)=>state.cart);
    const updateCartContext = useCartStore((state)=>state.updateCart);
    const removeCartContext = useCartStore((state)=>state.removeFromCart);

    let cartPrice = 0;
    cartContext.map(obj=>obj.item.currentPrice ? cartPrice+=obj.item.currentPrice:cartPrice+=0)

    const updateCart = async(cartId:any,quantity:number) =>{
        const response = await updateCartService(cartId,quantity);

        if(response.status === 201){
            updateCartContext(cartId,quantity);
            toast.success(response.data.message)

        }else{
            toast.error(response.data.message)

        }

    }

    const removeFromCart = async(cartId:any) =>{
        const response = await removeFromCartService(cartId);

        if(response.status === 200){
            removeCartContext(cartId);
            toast.success(response.data.message)

        }else{
            toast.error(response.data.message)

        }
    }

    


  return (
    cartContext.map((cart:any) => 
    
    <Paper elevation={5}
    key={cart._id}
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        marginBottom:"2rem",
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          
      }}
    >
      <Grid container spacing={2} >
        <Grid item>
        <NavLink to={`/products/${cart.item._id}`}>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={cart.item.image} />
          </ButtonBase>
          </NavLink>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
                <NavLink to={`/products/${cart.item._id}`} style={{textDecoration:"none"}}>
              <Typography gutterBottom variant="h6" component="div" color={"black"} sx={{fontWeight:"bold"}}>
                {cart.item.title}
              </Typography>
              </NavLink>
              {/* <Typography variant="body2" gutterBottom>
              {cart.item.description}
              </Typography> */}
              <Typography variant="subtitle1" color="black" sx={{fontWeight:"bold"}}>
              ₹{cart.item.currentPrice}
              </Typography>
            </Grid>
            <Grid item>
                
                <Typography  color={"black"} variant='body1' sx={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                    
                    <IconButton
                    onClick={()=>{updateCart(cart._id,cart.quantity-1)}}
                    disabled = {cart.quantity === 1 ? true:false}
                    >
                        <RemoveIcon/>
                    </IconButton>

                    {cart.quantity} 

                    <IconButton 
                    onClick={()=>{updateCart(cart._id,cart.quantity+1)}}
                    >
                        <AddIcon/>
                    </IconButton>
                </Typography>
                
            </Grid>
            
        </Grid>
        <Grid item>
            <Button variant='contained' color='error' size='small' startIcon={<DeleteIcon/>}
            onClick={()=>{removeFromCart(cart._id)}}
            >
                Remove
            </Button>
        </Grid>
          
        </Grid>
      </Grid>
      
    </Paper>
    )
    
    
  );
}


export default CartProduct;