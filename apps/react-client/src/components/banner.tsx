import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../contexts/productListing.context';


export default function Banner() {
  const allProducts = useProductStore((state)=>state.allProducts);
  const setInitialProducts = useProductStore((state)=>state.setInitialProducts)
  const setProducts = useProductStore((state)=>state.setProducts);
  const navigate = useNavigate();

    const post = {
        title: 'Apna Fitness, Cause Your Fitness is in Your Hands',
        description:
          "Your One Stop Solution to All the Equipments, Supplements and Accessories At Best Price",
          image:"https://t3.ftcdn.net/jpg/03/69/84/22/240_F_369842290_c1dQNWM8wnt3YD2uQTqupbda0XuksDXK.jpg",
        imageText: 'Apna Fitness Banner Image',
      };
  

  return (
    <Paper
      sx={{
        marginTop:{xs:"6.3rem",md:"auto"},
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
        
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none', }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 9 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            
              <Button variant='contained' color='primary' size='large' onClick={()=>{setInitialProducts(allProducts);setProducts(allProducts); navigate("/AllProducts")}}>SHOP NOW</Button>
            
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}