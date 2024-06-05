"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import getProductService from "../../../services/productServices/getProduct.service";
import { productType } from "common";
import DoneIcon from "@mui/icons-material/Done";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useCartStore from "../../../store/cart.store";
import addToCartService from "../../../services/cartServices/addToCart.service";
import useWishlistStore from "../../../store/wishlist.store";
import addToWishlistService from "../../../services/wishlistServices/addToWishlist.service";
import removeFromWishlistService from "../../../services/wishlistServices/removeFromWishlist.service";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "sonner";
import useLogOut from "../../../hooks/useLogOut";
import { useRouter } from "next/navigation";
import useAuth from "../../../utils/auth";

const defaultTheme = createTheme();

const SingleProductPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<productType>();
  let loggedIn = useAuth();

  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const addToCartContext = useCartStore((state) => state.addToCart);

  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlistContext = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlistContext = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const logOut = useLogOut();

  useEffect(() => {
    (async () => {
      const response = await getProductService(params.productId);

      if (response.product) {
        setProduct(response.product);
      } else {
        router.replace("/not-found");
      }
    })();
  }, [params.productId]);

  const CartButton = (product: productType) => {
    const addToCart = async (product: any, ProductId: any) => {
      const response = await addToCartService(ProductId);
      if (response.status === 201) {
        addToCartContext(product, response.data.cartId);
        toast.success(response.data.message);
      } else if (response.status === 401) {
        await logOut();
        toast.error("Session Expired, Login Again!");
      } else {
        toast.error(
          response.message ? response.message : response.data.message
        );
      }
    };
    return (
      <div style={{ marginLeft: 0, width: "100%", marginBottom: 15 }}>
        {product.inStock ? (
          cart.find((obj) => obj.item._id === product._id) ? (
            <Button
              variant="outlined"
              size="large"
              endIcon={<ShoppingCartIcon />}
              fullWidth
              onClick={() =>
                loggedIn ? router.push("/cart") : router.push("/login")
              }
            >
              Go To Cart
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              endIcon={<ShoppingCartIcon />}
              fullWidth={true}
              onClick={() =>
                loggedIn
                  ? addToCart(product, product._id)
                  : router.push("/login")
              }
            >
              Add To Cart
            </Button>
          )
        ) : (
          <Button variant="contained" size="large" fullWidth disabled>
            Out Of Stock
          </Button>
        )}
      </div>
    );
  };

  const WishlistButton = (product: productType) => {
    const contains = wishlist.some((item) => {
      return JSON.stringify(product) === JSON.stringify(item);
    });

    const addToWishlist = async (product: any, ProductId: any) => {
      const response = await addToWishlistService(ProductId);
      if (response.status === 201) {
        addToWishlistContext(product);
        toast.success(response.data.message);
      } else if (response.status === 401) {
        await logOut();
        toast.error("Session Expired, Login Again!");
      } else {
        toast.error(
          response?.message ? response.message : response.data.message
        );
      }
    };

    const removeFromWishlist = async (ProductId: any) => {
      const response = await removeFromWishlistService(ProductId);
      if (response.status === 201) {
        removeFromWishlistContext(ProductId);
        toast.success(response.data.message);
      } else if (response.status === 401) {
        await logOut();
        toast.error("Session Expired, Login Again!");
      } else {
        toast.error(
          response?.message ? response.message : response.data.message
        );
      }
    };

    return (
      <div style={{ marginLeft: 0, width: "100%" }}>
        {contains ? (
          <Button
            variant="outlined"
            size="large"
            color="inherit"
            fullWidth
            endIcon={<FavoriteIcon />}
            onClick={() =>
              loggedIn ? removeFromWishlist(product._id) : router.push("/login")
            }
          >
            Remove From Wishlist
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="large"
            color="error"
            fullWidth
            endIcon={<FavoriteIcon />}
            onClick={() =>
              loggedIn
                ? addToWishlist(product, product._id)
                : router.push("/login")
            }
          >
            Add To Wishlist
          </Button>
        )}
      </div>
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {product ? (
        <Container
          maxWidth="xl"
          sx={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <Toolbar />
          <Grid
            container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                height: 500,
                width: 400,
                padding: "10px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 0,
                boxShadow: 0,
                "@media (min-width: 600px)": {
                  boxShadow: 0,
                },
                "@media (min-width: 960px)": {
                  boxShadow: 1,
                },
                "@media (min-width: 1280px)": {
                  boxShadow: 1,
                },
              }}
            >
              <CardMedia
                component="img"
                height="5000"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", aspectRatio: "1" }}
              />

              {product.isDeliveredFast ? (
                <Typography
                  variant="body1"
                  color={"white"}
                  sx={{
                    backgroundColor: "red",
                    position: "absolute",
                    top: 10,
                    left: 0,
                    paddingLeft: 2,
                    paddingRight: 1,
                  }}
                >
                  Fast Delivery
                </Typography>
              ) : null}
            </Card>

            <Card
              sx={{
                height: 500,
                width: 400,
                padding: "10px",
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                borderRadius: 0,
                boxShadow: 0,
                "@media (min-width: 600px)": {
                  boxShadow: 0,
                },
                "@media (min-width: 960px)": {
                  boxShadow: 1,
                },
                "@media (min-width: 1280px)": {
                  boxShadow: 1,
                },
              }}
            >
              <CardContent sx={{ width: "100%" }}>
                <Typography gutterBottom variant="h5" fontWeight={"bold"}>
                  {product.title}
                </Typography>

                <Typography
                  variant="body1"
                  fontSize={"1.1rem"}
                  color="text.secondary"
                  gutterBottom
                >
                  {product.description}
                </Typography>
                <Rating name="read-only" value={product.rating} readOnly />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Stack
                    direction={"row"}
                    gap={1}
                    padding={"5px"}
                    sx={{ alignItems: "center" }}
                  >
                    <DoneIcon color="success" />
                    <Typography variant="h6">Durable</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    gap={1}
                    padding={"5px"}
                    sx={{ alignItems: "center" }}
                  >
                    <DoneIcon color="success" />
                    <Typography variant="h6">Affordable</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    gap={1}
                    padding={"5px"}
                    sx={{ alignItems: "center" }}
                  >
                    <DoneIcon color="success" />
                    <Typography variant="h6">Trusted</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    gap={1}
                    padding={"5px"}
                    sx={{ alignItems: "center" }}
                  >
                    <DoneIcon color="success" />
                    <Typography variant="h6">Authentic</Typography>
                  </Stack>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: "20px",
                    marginLeft: 0,
                  }}
                >
                  <Typography
                    variant="h5"
                    color="text.primary"
                    fontWeight={"bold"}
                  >
                    ₹{product.currentPrice} /-
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    fontSize={"1.1rem"}
                    marginLeft={1}
                    style={{ textDecoration: "line-through" }}
                  >
                    ₹{product.initialPrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="green"
                    fontSize={"1rem"}
                    marginLeft={1}
                    fontWeight={"bold"}
                  >
                    {Math.round(
                      100 - (product.currentPrice / product.initialPrice) * 100
                    )}
                    %OFF
                  </Typography>
                </div>
              </CardContent>
              <CardActions
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "30px",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                {CartButton(product)}

                {WishlistButton(product)}
              </CardActions>
            </Card>
          </Grid>
        </Container>
      ) : null}
    </ThemeProvider>
  );
};

export default SingleProductPage;
