"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  CardActions,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Rating,
} from "@mui/material";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { productType } from "common";
import getTrendingProductService from "../services/productServices/getTrendingProducts.service";
import ProductSkeleton from "./homeProductSkeleton";
import CartButton from "./cartButton";
import WishlistButton from "./wishlistButton";
import { use } from "react";

const theme = createTheme();

const dataPromise = getTrendingProductService();

const skeletonArray: number[] = [0, 1, 2, 3];
const HomeProductCard = () => {
  const products = use(dataPromise);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container
        maxWidth="xl"
        sx={{ position: "relative", paddingLeft: 0, paddingRight: 0 }}
      >
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {products.length > 0
            ? products.map((product: productType) => (
                <Grid
                  item
                  xs={6}
                  sm={3}
                  md={3}
                  lg={3}
                  xl={3}
                  key={product._id}
                  sx={{
                    marginLeft: { xs: -0.6, sm: 0, lg: 3.5 },
                    marginRight: { xs: 0.5, sm: 0, lg: -3.5 },
                  }}
                >
                  <Card
                    sx={{
                      height: { xs: 390, sm: 380, md: 460 },
                      width: { xs: 183, sm: 180, md: 230, lg: 290 },
                      padding: { xs: "0px", sm: "10px" },
                      marginBottom: "20px",
                      position: "relative",
                      ":hover": { boxShadow: "20" },
                    }}
                  >
                    <Link
                      href={`/products/${product._id}`}
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
                            height: { xs: 150, sm: 120, md: 200 },
                          }}
                        />

                        <CardContent>
                          <Typography
                            color={"black"}
                            sx={{
                              fontSize: {
                                xs: "1.2rem",
                                sm: "0.9rem",
                                md: "1.2rem",
                              },
                              fontWeight: "bold",
                            }}
                          >
                            {product.title}
                          </Typography>
                          <Typography
                            gutterBottom
                            color={"text.secondary"}
                            sx={{
                              fontSize: {
                                xs: "0.8rem",
                                sm: "0.7rem",
                                md: "1rem",
                              },
                              fontWeight: { xs: "bold", md: "normal" },
                            }}
                          >
                            {product.description}
                          </Typography>
                          <Typography
                            color="text.primary"
                            paddingRight={1}
                            sx={{
                              fontWeight: "bold",
                              fontSize: {
                                xs: "1.2rem",
                                sm: "0.9rem",
                                md: "1.2rem",
                              },
                            }}
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
                                fontSize: {
                                  xs: "1rem",
                                  sm: "0.8rem",
                                  md: "1rem",
                                },
                              }}
                            >
                              ₹{product.initialPrice}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="green"
                              sx={{
                                fontWeight: "bold",
                                fontSize: {
                                  xs: "0.9rem",
                                  sm: "0.8rem",
                                  md: "0.9rem",
                                },
                              }}
                            >
                              {Math.round(
                                100 -
                                  (product.currentPrice /
                                    product.initialPrice) *
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
                    </Link>
                    <CardActions
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        width: "90%",
                        paddingRight: 0,
                        left: { xs: 5, md: "auto" },
                      }}
                    >
                      <CartButton product={product} />
                    </CardActions>
                    <WishlistButton product={product} />
                    {product.isDeliveredFast ? (
                      <IconButton
                        size="large"
                        aria-label="fast delivery"
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
                </Grid>
              ))
            : skeletonArray.map((i) => <ProductSkeleton key={i.toString()} />)}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default HomeProductCard;
