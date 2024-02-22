import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getProductService from "../services/productServices/getProduct.service";
import { productType } from "common";
import DoneIcon from "@mui/icons-material/Done";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLoginStore } from "../contexts";
import { useNavigate } from "react-router-dom";
import useCartStore from "../contexts/cart.context";
import addToCartService from "../services/cartServices/addToCart.service";
import useWishlistStore from "../contexts/wishlist.context";
import addToWishlistService from "../services/wishlistServices/addToWishlist.service";
import removeFromWishlistService from "../services/wishlistServices/removeFromWishlist.service";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "sonner";

const defaultTheme = createTheme();

const SingleProductPage = () => {
  const { ProductId } = useParams();
  const [product, setProduct] = useState<productType>();
  const loggedIn =
    useLoginStore((state) => state.login) || localStorage.getItem("loggedIn");
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const addToCartCotext = useCartStore((state) => state.addToCart);

  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlistContext = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlistContext = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const setLogOut = useLoginStore((state) => state.setLogOut);

  const addToWishlist = async (product: any, ProductId: any) => {
    const response = await addToWishlistService(ProductId);
    if (response.status === 201) {
      addToWishlistContext(product);
      toast.success(response.data.message);
    } else if (response.status === 403) {
      localStorage.setItem("token", "");
      localStorage.removeItem("loggedIn");
      setLogOut();
      toast.error("Login First");
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFromWishlist = async (ProductId: any) => {
    const response = await removeFromWishlistService(ProductId);
    if (response.status === 201) {
      removeFromWishlistContext(ProductId);
      toast.success(response.data.message);
    } else if (response.status === 403) {
      localStorage.setItem("token", "");
      localStorage.removeItem("loggedIn");
      setLogOut();
      toast.error("Error, Login Again");
    } else {
      toast.error(response.data.message);
    }
  };

  const addToCart = async (product: any, ProductId: any) => {
    const response = await addToCartService(ProductId);
    if (response.status === 201) {
      addToCartCotext(product, response.data.cartId);
      toast.success(response.data.message);
    } else if (response.status === 403) {
      localStorage.setItem("token", "");
      localStorage.removeItem("loggedIn");
      setLogOut();
      toast.error("Error, Login Again");
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getProductService(ProductId);

      if (response.status === 200) {
        setProduct(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    })();
  }, [ProductId]);

  return (
    <ThemeProvider theme={defaultTheme}>
      {product ? (
        <Container maxWidth="xl" sx={{ marginTop: "auto" }}>
          <Toolbar />
          <Grid
            container
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Card
              sx={{
                maxHeight: 710,
                maxWidth: 945,
                padding: "10px",
                marginBottom: "20px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", aspectRatio: "2/2" }}
              />

              {product.isDeliveredFast ? (
                <IconButton
                  size="large"
                  aria-label="show wishlist"
                  color="error"
                  sx={{ position: "absolute", top: 0, left: 0 }}
                  disabled
                >
                  <Typography
                    variant="body2"
                    color={"white"}
                    sx={{ backgroundColor: "red" }}
                  >
                    Fast Delivery
                  </Typography>
                </IconButton>
              ) : null}
            </Card>

            <Card
              sx={{
                maxHeight: 710,
                maxWidth: 945,
                padding: "10px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "start",
                flexDirection: "row",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>
                <Rating name="read-only" value={product.rating} readOnly />
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Stack direction={"row"} gap={1} padding={"5px"}>
                    <DoneIcon color="success" />
                    <Typography variant="h6">Durable</Typography>
                  </Stack>
                  <Stack direction={"row"} gap={1} padding={"5px"}>
                    <DoneIcon color="success" />
                    <Typography variant="h6">Affordable</Typography>
                  </Stack>
                  <Stack direction={"row"} gap={1} padding={"5px"}>
                    <DoneIcon color="success" />
                    <Typography variant="h6">Trusted</Typography>
                  </Stack>
                  <Stack direction={"row"} gap={1} padding={"5px"}>
                    <DoneIcon color="success" />
                    <Typography variant="h6">Authentic</Typography>
                  </Stack>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.primary"
                    paddingRight={1}
                  >
                    ₹{product.currentPrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={"1.2rem"}
                    paddingRight={1}
                    style={{ textDecoration: "line-through" }}
                  >
                    ₹{product.initialPrice}
                  </Typography>
                  <Typography variant="body2" color="green" fontSize={"1.2rem"}>
                    {Math.round(
                      100 - (product.currentPrice / product.initialPrice) * 100
                    )}
                    %OFF
                  </Typography>
                </div>

                <CardActions
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "30px",
                    justifyContent: "center",
                  }}
                >
                  {product.inStock ? (
                    cart.filter((obj) => obj.item === product).length > 0 ? (
                      <Button
                        variant="contained"
                        size="medium"
                        fullWidth
                        sx={{ marginBottom: "10px" }}
                        endIcon={<ShoppingCartIcon />}
                        onClick={() =>
                          loggedIn ? navigate("/cart") : navigate("/login")
                        }
                      >
                        Go To Cart
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="medium"
                        fullWidth
                        sx={{ marginBottom: "10px" }}
                        endIcon={<ShoppingCartIcon />}
                        onClick={() =>
                          loggedIn
                            ? addToCart(product, product._id)
                            : navigate("/login")
                        }
                      >
                        Add To Cart
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="contained"
                      size="medium"
                      color="error"
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                      disabled
                    >
                      Out Of Stock
                    </Button>
                  )}
                  {wishlist.includes(product) ? (
                    <Button
                      variant="contained"
                      size="medium"
                      color="secondary"
                      fullWidth
                      sx={{ marginBottom: "10px", marginRight: "6px" }}
                      endIcon={<FavoriteIcon />}
                      onClick={() =>
                        loggedIn
                          ? removeFromWishlist(product._id)
                          : navigate("/login")
                      }
                    >
                      Remove From Wishlist
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="medium"
                      color="secondary"
                      fullWidth
                      sx={{ marginBottom: "10px", marginRight: "6px" }}
                      endIcon={<FavoriteIcon />}
                      onClick={() =>
                        loggedIn
                          ? addToWishlist(product, product._id)
                          : navigate("/login")
                      }
                    >
                      Add To Wishlist
                    </Button>
                  )}
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      ) : null}
    </ThemeProvider>
  );
};

export default SingleProductPage;
