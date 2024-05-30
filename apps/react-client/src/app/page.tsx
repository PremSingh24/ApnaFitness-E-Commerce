"use client";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Toolbar } from "@mui/material";
import Categories from "../components/category";
import Banner from "../components/banner";
import Footer from "../components/footer";
import HomeProductCard from "../components/homeProductCard";
import useFetchAllProducts from "../hooks/useProductFetch";
import useFetchUserCartAndWishlist from "../hooks/useUserDataFetch";

const theme = createTheme();

const HomePage = () => {
  useFetchAllProducts();
  useFetchUserCartAndWishlist();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          marginTop: { md: "4.2rem" },
          width: "100%",
        }}
      >
        <Banner />

        <Typography
          color={"black"}
          variant="h4"
          textAlign={"center"}
          padding={"10px"}
        >
          Categories
        </Typography>
        <Categories />

        <Toolbar />
        <Typography
          color={"black"}
          variant="h4"
          textAlign={"center"}
          padding={"10px"}
        >
          Our Products
        </Typography>

        <HomeProductCard />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default HomePage;