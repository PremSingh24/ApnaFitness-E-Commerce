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
  Divider,
  Grid,
  Rating,
} from "@mui/material";
import Link from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProductSkeleton from "./productSkeleton";
import CartButton from "./cartButton";
import { productType } from "common";
import WishlistButton from "./wishlistButton";

const theme = createTheme();

const ProductCard = ({ products }: { products: productType[] }) => {
  const showSkeleton = 12;
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
                  sm={6}
                  md={4}
                  lg={4}
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
              ))
            : Array.from({ length: showSkeleton }, (_, index) => (
                <ProductSkeleton key={index} />
              ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ProductCard;
