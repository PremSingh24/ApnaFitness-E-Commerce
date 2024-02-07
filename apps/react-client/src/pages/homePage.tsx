import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme,ThemeProvider  } from '@mui/material/styles';
import { Container, Toolbar } from '@mui/material';
import Categories from '../components/category';
import Banner from '../components/banner';
import useProductStore from '../contexts/productListing.context';
import Footer from '../components/footer';
import HomeProductCard from '../components/homeProductCard';

const theme = createTheme();


const HomePage = () =>  {
  const allProducts = useProductStore((state)=>state.allProducts)

  const products = allProducts.filter((product)=>product.isTrending);
  


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Container maxWidth="xl" sx={{position:"relative",marginTop:{md:"4.2rem"},width:"100%"}}>
      
      <Banner />

      
      <Typography color={"black"} variant='h4' textAlign={"center"} padding={"10px"}>Categories</Typography>
      <Categories/>

      <Toolbar/>
      <Typography color={"black"} variant='h4' textAlign={"center"} padding={"10px"}>Our Products</Typography>
      
      <HomeProductCard products={products}/>


    </Container>
    <Footer/>
    </ThemeProvider>
  )
}


export default HomePage;