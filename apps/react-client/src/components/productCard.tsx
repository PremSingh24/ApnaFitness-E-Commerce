import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Loader from "./loader";
import { NavLink } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { productType } from "common";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../contexts";
import useWishlistStore from "../contexts/wishlist.context";
import addToWishlistService from "../services/wishlistServices/addToWishlist.service";
import FavoriteIcon from "@mui/icons-material/Favorite";
import removeFromWishlistService from "../services/wishlistServices/removeFromWishlist.service";
import useCartStore from "../contexts/cart.context";
import addToCartService from "../services/cartServices/addToCart.service";
import { toast } from "sonner";

const theme = createTheme();

const ProductCard = ({ products }: { products: productType[] }) => {
  const loggedIn =
    useLoginStore((state) => state.login) || localStorage.getItem("loggedIn");
  const setLogOut = useLoginStore((state) => state.setLogOut);
  const navigate = useNavigate();

  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlistContext = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlistContext = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const cart = useCartStore((state) => state.cart);
  const addToCartCotext = useCartStore((state) => state.addToCart);

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
      toast.error("Login First");
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
      toast.error("Please Login First");
    } else {
      toast.error(response.data.message);
    }
  };

  const wishlistButton = (product: productType) => {
    const contains = wishlist.some((item) => {
      return JSON.stringify(product) === JSON.stringify(item);
    });

    return (
      <>
        {contains ? (
          <IconButton
            size="large"
            aria-label="show wishlist"
            color="inherit"
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={() =>
              loggedIn ? removeFromWishlist(product._id) : navigate("/login")
            }
          >
            <FavoriteIcon color="error" />
          </IconButton>
        ) : (
          <IconButton
            size="large"
            aria-label="show wishlist"
            color="inherit"
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={() =>
              loggedIn
                ? addToWishlist(product, product._id)
                : navigate("/login")
            }
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </>
    );
  };

  const cartButton = (product: productType) => {
    return (
      <>
        {product.inStock ? (
          cart.find((obj) => obj.item._id === product._id) ? (
            <Button
              variant="outlined"
              size="medium"
              fullWidth
              onClick={() =>
                loggedIn ? navigate("/MyCart") : navigate("/login")
              }
            >
              Go To Cart
            </Button>
          ) : (
            <Button
              variant="contained"
              size="medium"
              fullWidth
              onClick={() =>
                loggedIn ? addToCart(product, product._id) : navigate("/login")
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
            disabled
          >
            Out Of Stock
          </Button>
        )}
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container
        maxWidth="xl"
        sx={{ position: "relative", paddingLeft: 0, paddingRight: 0 }}
      >
        {products.length > 0 ? (
          <Grid container spacing={2} sx={{ marginTop: "20px" }}>
            {products.map((product: productType) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                key={product._id}
                sx={{ marginLeft: -0.6, marginRight: 0.5 }}
              >
                <Card
                  sx={{
                    height: { xs: 390, sm: 470, md: 460 },
                    width: { xs: 183, sm: 215, md: 230, lg: 290 },
                    padding: { xs: "0px", sm: "10px" },
                    marginBottom: "20px",
                    position: "relative",
                    boxShadow: { xs: "0.2" },
                    "@media (min-width:780px)": {
                      ":hover": { boxShadow: "20" },
                    },
                  }}
                >
                  <NavLink
                    to={`/products/${product._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.title}
                        sx={{
                          objectFit: "contain",
                          aspectRatio: "3/2",
                          height: { xs: 150, sm: 200 },
                        }}
                      />
                      <Divider
                        sx={{
                          width: "100vw",
                          position: "absolute",
                          left: -10,
                          right: 0,
                        }}
                      />

                      <CardContent>
                        <Typography
                          color={"black"}
                          sx={{
                            fontSize: { xs: "1rem", md: "1.2rem" },
                            fontWeight: "bold",
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Typography
                          gutterBottom
                          color={"text.secondary"}
                          sx={{
                            fontSize: { xs: "0.8rem", md: "1rem" },
                            fontWeight: { xs: "bold", md: "normal" },
                          }}
                        >
                          {product.description}
                        </Typography>
                        <Typography
                          color="text.primary"
                          paddingRight={1}
                          sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                        >
                          ₹{product.currentPrice}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paddingRight={1}
                            sx={{
                              textDecoration: "line-through",
                              fontSize: "1rem",
                            }}
                          >
                            ₹{product.initialPrice}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="green"
                            sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
                          >
                            {Math.round(
                              100 -
                                (product.currentPrice / product.initialPrice) *
                                  100
                            )}
                            %OFF
                          </Typography>
                        </div>
                        <Rating
                          name="read-only"
                          value={product.rating}
                          readOnly
                        />
                      </CardContent>
                    </CardActionArea>
                  </NavLink>
                  <CardActions
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "90%",
                      paddingRight: 0,
                      left: { xs: 5, md: "auto" },
                    }}
                  >
                    {cartButton(product)}
                  </CardActions>
                  {wishlistButton(product)}

                  {product.isDeliveredFast ? (
                    <Typography
                      variant="body2"
                      color={"white"}
                      sx={{
                        backgroundColor: "red",
                        paddingLeft: 2,
                        paddingRight: 1,
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    >
                      Fast Delivery
                    </Typography>
                  ) : null}
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Loader />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ProductCard;
