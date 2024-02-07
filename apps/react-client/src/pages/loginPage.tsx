import { loginUserType } from "common";
import  loginUserService  from "../services/authServices/login.service";
import { TextField,Button,Typography,Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import {useForm} from "react-hook-form"
import PasswordField  from "../components/passwordField";
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import {useLoginStore} from "../contexts";
import Footer from "../components/footer";
import {  toast } from "sonner";



const defaultTheme = createTheme();


const LoginPage = ()=> {
  const navigate = useNavigate()
  const setLogin = useLoginStore((state)=>state.setLogin)


    const userData = useForm<loginUserType>({
        defaultValues:{
            email:"",
            password:"",
        }
    });






    
    const {register,handleSubmit, formState} = userData;

    const {errors} = formState;

    const setLoginDetails = () => {
      //// Add Cart Wishlist and User Context here when logging in 

      setLogin();
      navigate("/", { replace: true });

    }

    const loginUser = async (data:loginUserType) => {
              
      const response = await loginUserService(data);
    
      if (response.status === 200) {
        setLoginDetails();

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("loggedIn", "true");
        toast.success(response.data.message);

        
        
      }else{
        toast.error(response.message? response.message : response.data.message)
      }
    }

    
    return (
      <ThemeProvider theme={defaultTheme} >
        <Toolbar/>
        <Container  component="main" maxWidth="xs" sx={{height:{xs:"80vh",sm:"100%"},display:"flex",justifyContent:"center",alignItems:"center"}}>
          <CssBaseline />
          <Paper variant="elevation" elevation={5} 
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              my: { xs: 3, md: 9 }, 
              p: { xs: 3, md: 5 },
              borderRadius: "5%"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(loginUser)} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                
                
                <Grid item xs={12}>
                  <TextField
                      label="Mobile Number/Email Id"
                      id="mobile"
                      type="phone"
                      fullWidth
                      required
                      {...register("email",{required:"Mobile Number/ Email Id Required",minLength:{value:10,message:"Invalid Mobile Number/Email Id"},
                      pattern: {
                          value: /^\S*$/,
                          message: "Space Detected",
                      }})}
                      error = {!!errors.email}
                      helperText = {errors.email?.message}
                      InputProps={{inputProps:{maxLength:30}}}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordField 
                      label = "Password" 
                      id = "password" 
                      register = {register}
                      errors = {!!errors.password}
                      helperText = {errors.password?.message}
                      message="Password is Required"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 4, mb: 6,borderRadius:6 }}
              >
                Login
              </Button>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <NavLink to="/register" >
                  New User? Sign Up
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/register" >
                  Forgot Password?
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          
          </Container>
        <Footer/>
      </ThemeProvider>

    );   
}

export default LoginPage;