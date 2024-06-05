"use client";
import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  Paper,
  Slide,
} from "@mui/material";
import useProductStore from "../store/productListing.store";
import { productType } from "common";
import useWishlistStore from "../store/wishlist.store";
import useCartStore from "../store/cart.store";
import logo from "../assets/logo.webp";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useAuth from "../utils/auth";

const theme = createTheme();

theme.typography.h6 = {
  fontSize: ".8rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

const Search = styled("div")(({ theme }) => ({
  position: "sticky",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginRight: theme.spacing(0),
  marginLeft: 0,
  marginBottom: 5,
  marginTop: 5,
  width: "auto",
  [theme.breakpoints.down("md")]: {
    marginTop: -15,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "96vw",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 20, 1.5, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //transition: theme.transitions.create('width'),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
    },
  },
}));

const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedProducts, setSearchedProducts] = useState<productType[]>([]);

  const products = useProductStore((state) => state.allProducts);
  const router = useRouter();

  const wishlist = useWishlistStore((state) => state.wishlist);

  const cart = useCartStore((state) => state.cart);

  const loggedIn = useAuth();

  useEffect(() => {
    const result =
      products.length > 0 && searchInput.trim() !== ""
        ? products.filter((product) =>
            product.title.toLowerCase().includes(searchInput.toLowerCase())
          )
        : [];
    setSearchedProducts(result);
  }, [searchInput]);

  const [isSticky, setIsSticky] = useState(false);

  let lastScrollTop = 0;

  const handleScroll = () => {
    const st = window.scrollY || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      setIsSticky(true);
    } else if (st < lastScrollTop) {
      setIsSticky(false);
    }

    lastScrollTop = st <= 0 ? 0 : st;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const SearchResults = () => {
    return (
      <>
        {searchInput.trim() !== "" && searchedProducts ? (
          <Container component="main" sx={{ position: "fixed", zIndex: 1202 }}>
            <Paper
              variant="elevation"
              elevation={16}
              sx={{
                width: { xs: "100vw", md: "565px" },
                maxWidth: "auto",
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxHeight: "300px",
                overflowY: "scroll",
                scrollbarWidth: "thin",
                marginLeft: { xs: -3, sm: -5, md: -3 },
                marginTop: { xs: 0.5, md: "auto" },
                borderRadius: 1,
              }}
            >
              {/* Search Results */}
              <List disablePadding sx={{ width: "100%", alignItems: "center" }}>
                {searchedProducts.length > 0 ? (
                  searchedProducts.map((product) => (
                    <div key={product._id}>
                      <ListItem
                        sx={{ ":hover": { backgroundColor: "gray" } }}
                        onClick={() => {
                          router.push(`/products/${product._id}`);
                          setSearchInput("");
                        }}
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          height={40}
                          width={40}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                        <Typography
                          variant="body1"
                          color={"black"}
                          sx={{ marginLeft: 2 }}
                        >
                          {product.title}
                        </Typography>
                      </ListItem>
                      <Divider sx={{ width: "100%" }} />
                    </div>
                  ))
                ) : (
                  <Typography variant="h5" padding={"40px"}>
                    No Products Found
                  </Typography>
                )}
              </List>
            </Paper>
          </Container>
        ) : null}
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            width: "100%",
            position: "fixed",
            top: { xs: isSticky ? -43 : 0, md: 0 },
            zIndex: theme.zIndex.drawer + 1,
            background: "linear-gradient(to right, #1e90ff, #0073e6)",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* ApnaFitness Logo */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="ApnaFitness logo"
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "none" },
                width: { xs: "100vw", md: "auto" },
                bottom: { xs: 8, md: "auto" },
                position: { xs: "relative", md: "-webkit-sticky" },
                objectFit: "contain",
              }}
              onClick={() => router.push("/")}
            >
              <Image
                src={logo.src}
                width={50}
                height={43}
                alt="ApnaFitness logo"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "50px",
                  maxHeight: "43px",
                  objectFit: "contain",
                }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  color: "white",
                  display: "flex",
                  objectFit: "contain",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: { xs: "1rem", md: "1.8rem" },
                }}
              >
                ApnaFitness
              </Typography>
            </IconButton>

            {/* SearchBox */}
            <Search
              sx={{
                position: { xs: "-webkit-sticky", md: "relative" },
                top: { xs: 0, md: "auto" },
              }}
            >
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "black" }} />
              </SearchIconWrapper>
              <StyledInputBase
                id="searchBox"
                name="searchBox"
                placeholder="Search for Products"
                inputProps={{ "aria-label": "search" }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <SearchResults />
            </Search>

            {loggedIn == undefined ? (
              <></>
            ) : loggedIn ? (
              <Box
                sx={{
                  display: "flex",
                  position: { xs: "absolute", md: "relative" },
                  top: { xs: 2, md: "auto" },
                  right: { xs: 8, md: "auto" },
                }}
              >
                <IconButton
                  edge="start"
                  aria-label="account of current user"
                  aria-controls={"primary-search-account-menu"}
                  aria-haspopup="true"
                  onClick={() => router.push("/user")}
                  color="inherit"
                  sx={{
                    display: { xs: "none", sm: "flex", md: "flex" },
                    marginLeft: { md: "2rem" },
                  }}
                >
                  <Slide
                    direction="left"
                    in={true}
                    mountOnEnter
                    unmountOnExit
                    style={{ transitionDelay: "200ms" }}
                  >
                    <AccountCircle
                      sx={{
                        fontSize: { xs: "2rem", sm: "1.6rem", xl: "1.8rem" },
                      }}
                    />
                  </Slide>
                </IconButton>

                <IconButton
                  size="large"
                  aria-label="show wishlist"
                  color="inherit"
                  sx={{
                    display: { xs: "none", sm: "flex", md: "flex" },
                    marginLeft: { xl: "1rem" },
                  }}
                  onClick={async () => router.push("/wishlist")}
                >
                  <Badge
                    badgeContent={wishlist.length > 0 ? wishlist.length : null}
                    color="error"
                  >
                    <Slide
                      direction="left"
                      in={true}
                      mountOnEnter
                      unmountOnExit
                      style={{ transitionDelay: "500ms" }}
                    >
                      <FavoriteIcon
                        sx={{
                          fontSize: { xs: "2rem", sm: "1.6rem", xl: "1.8rem" },
                        }}
                      />
                    </Slide>
                  </Badge>
                </IconButton>

                <IconButton
                  size="large"
                  color="inherit"
                  sx={{
                    display: { xs: "flex", sm: "flex", md: "flex" },
                    marginLeft: { xl: "1rem" },
                  }}
                  onClick={() => router.push("/cart")}
                >
                  <Badge
                    badgeContent={cart.length > 0 ? cart.length : null}
                    color="error"
                  >
                    <Slide
                      direction="left"
                      in={true}
                      mountOnEnter
                      unmountOnExit
                      style={{ transitionDelay: "800ms" }}
                    >
                      <ShoppingCartIcon
                        sx={{
                          fontSize: {
                            xs: "1.7rem",
                            sm: "1.6rem",
                            xl: "1.8rem",
                          },
                        }}
                      />
                    </Slide>
                  </Badge>
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  position: { xs: "absolute", md: "relative" },
                  top: { xs: 10, md: "auto" },
                  right: { xs: 1, md: "auto" },
                  justifyContent: { xs: "flex-end", md: "space-around" },
                  alignItems: { xs: "center", md: "none" },
                  marginLeft: { md: "1rem" },
                }}
              >
                <Link href="/login">
                  <Slide direction="left" in={true} mountOnEnter unmountOnExit>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        background:
                          "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",

                        minWidth: "max-content",
                        marginRight: ".7rem",
                        fontSize: { xs: "0.7rem", md: "0.85rem" },
                      }}
                    >
                      Log In
                    </Button>
                  </Slide>
                </Link>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
