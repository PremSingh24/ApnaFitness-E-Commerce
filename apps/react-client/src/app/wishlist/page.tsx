"use client";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Container, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import useWishlistStore from "../../store/wishlist.store";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("../../components/productCard"), {
  ssr: false,
});

const theme = createTheme();

const WishlistPage = () => {
  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          marginTop: { xs: "6rem", md: "4.5rem" },
          mb: { xs: "4rem", sm: "1rem", md: "2rem" },
        }}
      >
        <Stack
          direction={"row"}
          gap={1}
          padding={"5px"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            color={"black"}
            variant="h3"
            textAlign={"center"}
            padding={"10px"}
          >
            My Wishlist{" "}
          </Typography>
          <FavoriteIcon sx={{ fontSize: "2.7rem" }} color="error" />
        </Stack>

        {wishlist.length > 0 ? (
          <ProductCard products={wishlist} />
        ) : (
          <Stack
            direction={"column"}
            gap={1}
            padding={"5px"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              color={"black"}
              variant="h4"
              textAlign={"center"}
              padding={"10px"}
              marginTop={"60px"}
            >
              Wishlist is Empty
            </Typography>
            <Link href={"/"} replace={true}>
              <Button variant="contained">Explore More</Button>
            </Link>
          </Stack>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default WishlistPage;
