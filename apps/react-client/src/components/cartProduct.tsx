import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useCartStore from "../contexts/cart.context";
import updateCartService from "../services/cartServices/updateCartQty.service";
import removeFromCartService from "../services/cartServices/removeFromCart.service";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CartProduct = () => {
  const cartContext = useCartStore((state) => state.cart);
  const updateCartContext = useCartStore((state) => state.updateCart);
  const removeCartContext = useCartStore((state) => state.removeFromCart);

  let cartPrice = 0;
  cartContext.map((obj) =>
    obj.item.currentPrice
      ? (cartPrice += obj.item.currentPrice)
      : (cartPrice += 0)
  );

  const updateCart = async (cartId: any, quantity: number) => {
    const response = await updateCartService(cartId, quantity);

    if (response.status === 201) {
      updateCartContext(cartId, quantity);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFromCart = async (cartId: any) => {
    const response = await removeFromCartService(cartId);

    if (response.status === 200) {
      removeCartContext(cartId);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return cartContext.map((cart: any) => (
    <Paper
      elevation={3}
      key={cart._id}
      sx={{
        p: 2,
        margin: "auto",
        width: { xs: "100%", sm: 500 },
        flexGrow: 1,
        marginBottom: "2rem",
        borderRadius: "15px",
        paddingLeft: "10px",
      }}
    >
      <Grid container spacing={1} sx={{ position: "relative" }}>
        <Grid item>
          <NavLink to={`/products/${cart.item._id}`}>
            <ButtonBase
              sx={{ width: { xs: 128, sm: 150 }, height: { xs: 128, sm: 150 } }}
            >
              <Img alt="complex" src={cart.item.image} />
            </ButtonBase>
          </NavLink>
        </Grid>
        <Grid item xs={7} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <NavLink
                to={`/products/${cart.item._id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  color={"black"}
                  sx={{ fontWeight: "bold" }}
                >
                  {cart.item.title}
                </Typography>
              </NavLink>

              <Typography
                variant="subtitle1"
                color="black"
                sx={{ fontWeight: "bold" }}
              >
                ₹{cart.item.currentPrice}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                color={"black"}
                variant="body1"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "bold",
                  border: "1px solid gray",
                  width: "90px",
                  borderRadius: "10px",
                }}
              >
                <IconButton
                  onClick={() => {
                    updateCart(cart._id, cart.quantity - 1);
                  }}
                  disabled={cart.quantity === 1 ? true : false}
                  sx={{
                    borderRight: "1px solid gray",
                    borderRadius: "1px",
                    width: "30px",
                    color: "black",
                  }}
                >
                  <RemoveIcon />
                </IconButton>

                {cart.quantity}

                <IconButton
                  onClick={() => {
                    updateCart(cart._id, cart.quantity + 1);
                  }}
                  disabled={cart.quantity < 9 ? false : true}
                  sx={{
                    borderLeft: "1px solid gray",
                    borderRadius: "1px",
                    width: "30px",
                    color: "black",
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Typography>
            </Grid>
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => {
                removeFromCart(cart._id);
              }}
              sx={{ position: "absolute", bottom: 5, right: 0 }}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  ));
};

export default CartProduct;
