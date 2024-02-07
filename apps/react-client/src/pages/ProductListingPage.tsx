import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import SideDrawer from '../components/sideDrawer';
import { createTheme,ThemeProvider  } from '@mui/material/styles';
import ProductCard from '../components/productCard';
import useProductStore from '../contexts/productListing.context';
import Loader from '../components/loader';
import { useEffect, useState } from 'react';
import MobileFilters from '../components/mobileFilters';

const theme = createTheme();

const drawerWidth = 280



const ProductListingPage = () =>{
  let products = useProductStore((state)=>state.products);

  const [isSticky, setIsSticky] = useState(false);

  let lastScrollTop = 0;

  const handleScroll = () => {
    //const scrollY = window.scrollY || document.documentElement.scrollTop;
    //setIsSticky(scrollY > 50);

    const st = window.scrollY || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      setIsSticky(true)
   } else if (st < lastScrollTop) {
    setIsSticky(false)
   } // else was horizontal scroll

   lastScrollTop = st <= 0 ? 0 : st;
    
    
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  


    return (
        <ThemeProvider theme={theme}>
          
          <CssBaseline/>
        <Box sx={{display:{xs:"flex",sm:"none"},width:"100%",flexDirection:"row",position:"fixed",
          justifyContent:"center",alignItems:"center",marginTop:isSticky ? "3.6rem" :"6.31rem",zIndex:1200
          }}
        >

          <MobileFilters/>
          
        </Box> 
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },}}
            aria-label="filter-drawer"
            
          >
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              <SideDrawer/>
            </Drawer>
          </Box>


          {products.length > 0 ?
          <Box
            component="main"
            sx={{ flexGrow: 1,ml:{xs:"10px",md:0}, width: {xs:"100vw", sm: `calc(100% - ${drawerWidth}px)` },mt:{xs:"10rem",sm:"5.5rem",md:"4rem"},mb:{xs:"4rem",sm:"1rem",md:"2rem"} }}
          >
    
            <ProductCard products={products} />
          </Box>
          :
          <Loader/>
          }
        </Box>
        </ThemeProvider>
      
      );

}


export default ProductListingPage;