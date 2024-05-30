"use client";
import { useEffect, useState } from "react";
import useCategoryProductsFetch from "../../../../hooks/useCategoryProductsFetch";
import useFilterStore from "../../../../store/filter.store";
import { getFilteredProducts } from "../../../../helpers/filter.helpers";
import {
  Box,
  CssBaseline,
  Drawer,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MobileFilters from "../../../../components/mobileFilters";
import SideDrawer from "../../../../components/sideDrawer";
import dynamic from "next/dynamic";

type props = {
  params: {
    slugs: string[];
  };
};

const ProductCard = dynamic(
  () => import("../../../../components/productCard"),
  {
    ssr: false,
  }
);

const theme = createTheme();

const drawerWidth = 280;

const CategoryPage = ({ params }: props) => {
  const { products } = useCategoryProductsFetch(params.slugs[1]);

  const filterState = useFilterStore((state) => state);

  const filteredProducts = getFilteredProducts(products, filterState);

  const resetFilters = useFilterStore((state) => state.resetAllFilters);

  // This effect will trigger whenever the component unmounts (user navigates away)
  useEffect(() => {
    return () => {
      // Reset the global filters state when the component unmounts (user navigates away)
      resetFilters();
    };
  }, [resetFilters]);

  const ScrollTrack = ({ children }: { children: JSX.Element }) => {
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

    return (
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          width: "100%",
          flexDirection: "row",
          position: "fixed",
          justifyContent: "center",
          alignItems: "center",
          marginTop: isSticky ? "3.6rem" : "6.31rem",
          zIndex: 1200,
        }}
      >
        {children}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollTrack>
        <MobileFilters />
      </ScrollTrack>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="filter-drawer"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <SideDrawer />
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: { xs: "10px", md: 0 },
            width: { xs: "100vw", sm: `calc(100% - ${drawerWidth}px)` },
            mt: { xs: "10rem", sm: "5.5rem", md: "4rem" },
            mb: { xs: "4rem", sm: "1rem", md: "2rem" },
          }}
        >
          <ProductCard products={filteredProducts} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default CategoryPage;
