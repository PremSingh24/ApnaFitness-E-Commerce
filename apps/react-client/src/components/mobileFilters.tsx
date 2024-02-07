import { Divider, IconButton, Paper, Typography } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';




const MobileFilters = () =>{

    return (
        <>
        <Paper sx={{width:"49%",display:"flex",justifyContent:"center"}}>
    
          <IconButton
              size="large"
              aria-label="show sort"
              color="inherit"
              sx={{ alignContent:"center",padding:"15px" }}
          >
            <SortIcon sx={{fontSize:"1.5rem"}}/>
            <Typography fontSize={"1.2rem"}>Sort</Typography>
          </IconButton>
          <Divider/>
          </Paper>
          <Paper sx={{width:"50%",display:"flex",justifyContent:"center",}}>
          <IconButton
              size="large"
              aria-label="show filters"
              color="inherit"
              sx={{ alignContent:"center",padding:"15px" }}
          >
            <FilterAltIcon sx={{fontSize:"1.5rem"}}/>
            <Typography fontSize={"1.2rem"}>Filter</Typography>
          </IconButton>
    
    
        </Paper>
        </>
    )



}

export default MobileFilters;