import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import Toolbar from '@mui/material/Toolbar';
import { Button, Checkbox, FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import useProductStore from '../contexts/productListing.context';
import { getFilteredProducts } from '../helpers/filter.helpers';


function valuetext(value: number) {
    return `Rs${value}`;
  }

const SideDrawer = () =>{
    const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
    const [rating, setRating] = useState(1);
    const [sort, setSort] = useState("");
    const [fastDelivery, setFastDelivery] = useState<boolean>(false);

    const [outOfStock, setOutOfStock] = useState(false);

    const setProducts = useProductStore((state)=>state.setProducts)

    const initialProducts = useProductStore((state)=>state.initialProducts)

    const filterState = {
        sortBy:sort,
        priceRange:priceRange,
        rating:rating,
        removeOutOfStock:outOfStock,
        fastDeliveryOnly:fastDelivery,
    }

    

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
        
        const filteredProducts = getFilteredProducts(initialProducts,{...filterState,priceRange:newValue as number[]});
        setProducts(filteredProducts)
    };

    const handlePriceFromInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        (event.target.value === '' ? setPriceRange((previous)=>{return [0,previous[1]]}) : 

        setPriceRange((previous)=>{return [Number(event.target.value),previous[1]]}));

       
        const filteredProducts = getFilteredProducts(initialProducts,{...filterState,priceRange:[Number(event.target.value),priceRange[1]]});
        setProducts(filteredProducts)
    };

    const handlePriceToInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        (event.target.value === '' ? setPriceRange((previous)=>{return [previous[0],0]}) : 

        setPriceRange((previous)=>{return [previous[0],Number(event.target.value)]}));

        
        const filteredProducts = getFilteredProducts(initialProducts,{...filterState,priceRange:[priceRange[0],Number(event.target.value)]});
        setProducts(filteredProducts)
    };


    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRating(Number(event.target.value));
        
        const filteredProducts = getFilteredProducts(initialProducts,{...filterState,rating:Number(event.target.value)});
        setProducts(filteredProducts)
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSort((event.target.value));
        
        const filteredProducts = getFilteredProducts(initialProducts,{...filterState,sortBy:event.target.value});
        setProducts(filteredProducts)
    };

    const handleFastDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFastDelivery(event.target.checked);
        
        const filteredProducts = getFilteredProducts(initialProducts,{...filterState,fastDeliveryOnly:event.target.checked});
        setProducts(filteredProducts)
    };

    const handleOutOfStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOutOfStock(event.target.checked);
        
        const filteredProducts = getFilteredProducts(initialProducts,{...filterState,removeOutOfStock:event.target.checked});
        setProducts(filteredProducts)
    };

    const resetFilters = () => {
        setPriceRange([0,10000]);
        setRating(1);
        setSort("");
        setFastDelivery(false);
        setOutOfStock(false);
        setProducts(initialProducts);
    }


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
        <div style={{marginTop:"4rem",padding:"1rem"}}>
            <List sx={{display:"flex",justifyContent:"space-around",marginTop:{sm:isSticky ? "auto":"2rem",md:"0"}}}>
                <Typography variant='h5'>Filters</Typography>
                <Button variant='text' sx={{fontSize:"1rem"}}
                
                onClick={()=>{resetFilters()}}
                >
                    Clear All
                </Button>
            </List>
            <Divider />

            <Typography variant='h6' fontWeight={600} paddingTop={"1rem"}>Price</Typography>
            <List sx={{display:"flex",justifyContent:"space-between"}}>
                <Typography variant='subtitle1'>0</Typography>
                <Typography variant='subtitle1'>2K</Typography>
                <Typography variant='subtitle1'>4K</Typography>
                <Typography variant='subtitle1'>6K</Typography>
                <Typography variant='subtitle1'>8K</Typography>
                <Typography variant='subtitle1'>10K</Typography>
            </List>
            <List sx={{display:"flex",justifyContent:"center"}}>
                <Box sx={{ width: "100%" }}>
                    <Slider
                        getAriaLabel={() => 'Price range'}
                        size='medium'
                        min={0}
                        max={10000}
                        value={priceRange}
                        onChange={handleSliderChange}
                        getAriaValueText={valuetext}
                    />
                </Box>
            </List>
            <ListItem sx={{display:"flex",justifyContent:"space-between"}}>
                <Typography variant='subtitle1'>From</Typography>
                <Typography variant='subtitle1'>To</Typography>
            </ListItem>
            <List sx={{display:"flex",justifyContent:"space-between"}}>
                <TextField
                value={priceRange[0]}
                size="small"
                onChange={handlePriceFromInputChange}
                //onBlur={handleBlur}
                inputProps={{
                step: 100,
                min: 0,
                max: priceRange[1],
                type: 'number',
                }}
                InputProps={{startAdornment: <InputAdornment position="start">₹</InputAdornment>,}}
                
            />
                <TextField
                value={priceRange[1]}
                size="small"
                onChange={handlePriceToInputChange}
                //onBlur={handleBlur}
                inputProps={{
                step: 100,
                min: priceRange[0],
                max: 10000,
                type: 'number',
                }}
                InputProps={{startAdornment: <InputAdornment position="start">₹</InputAdornment>,}}
            />
            </List>

          <Divider />
          <Typography variant='h6' fontWeight={600} paddingTop={"1rem"}>Ratings</Typography>
          <FormControl>
                <RadioGroup
                    name="controlled-radio-buttons-group"
                    value={rating}
                    onChange={handleRatingChange}
                >
                <FormControlLabel value={4} name='4star' control={<Radio />} label="4 Star and Above" />
                <FormControlLabel value={3} name='3star' control={<Radio />} label="3 Star and Above" />
                </RadioGroup>
          </FormControl>


          <Divider />

          <Typography variant='h6' fontWeight={600} paddingTop={"1rem"}>Sort By</Typography>
          <FormControl>
                <RadioGroup
                    name="controlled-radio-buttons-group"
                    value={sort}
                    onChange={handleSortChange}
                >
                <FormControlLabel value="low" name='Low' control={<Radio />} label="Low to High" />
                <FormControlLabel value="high" name='High' control={<Radio />} label="High to Low" />
                </RadioGroup>
          </FormControl>

          <Divider />

          <Typography variant='h6' fontWeight={600} paddingTop={"1rem"}>Other Filters</Typography>
          <FormControl>
                
                <FormControlLabel value={true} name='Fast Delivery' 
                control={<Checkbox onChange={handleFastDeliveryChange}
                checked={fastDelivery}
                inputProps={{ 'aria-label': 'controlled' }}/>} 
                label="Fast Delivery Only" 
                />

                <FormControlLabel value={true} name='Out Of Stock' 
                control={<Checkbox onChange={handleOutOfStockChange}
                checked={outOfStock}
                inputProps={{ 'aria-label': 'controlled' }}/>} 
                label="Remove Out of Stock" 
                />
          </FormControl>
        </div>
      );
}

export default SideDrawer;