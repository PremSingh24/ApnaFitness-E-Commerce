import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";



const Footer = ()=> {
    return (
        <Box
          component="footer"
          style={{marginTop:"auto",flex:"1"}}
          sx={{
            // position:{xs:"absolute",sm:"static"},
            // bottom:"0vh",
            
            
            width:"100%",
            py: 3,
            px: 2,
            mt: 'auto',
            mb:{xs:"3.5rem",sm:"auto"},
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
        <Container maxWidth="sm" sx={{display:"flex",justifyContent:"center"}}>
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" to="/">
            ApnaFitness
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
      </Container>
      </Box>
    );
}

export default Footer;