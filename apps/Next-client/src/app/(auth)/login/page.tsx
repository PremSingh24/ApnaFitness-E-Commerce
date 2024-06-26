"use client";
import { loginUserType } from "common";
import { TextField, Button, Typography, Toolbar } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useLoginStore from "../../../store/login.store";
import PasswordField from "../../../components/passwordField";
import loginUserService from "../../../services/authServices/login.service";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader";

const defaultTheme = createTheme();

const LoginPage = () => {
  const router = useRouter();
  const setLogin = useLoginStore((state) => state.setLogin);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = document.cookie === "loggedIn=true";

    if (loggedIn) {
      router.replace("/");
      return;
    }
  }, []);

  const userData = useForm<loginUserType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = userData;

  const { errors } = formState;

  const loginUser = async (data: loginUserType) => {
    setLoading(true);
    const response = await loginUserService(data);

    if (response.status === 200) {
      setLogin();
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1);
      document.cookie =
        "loggedIn=true; expires=" + expiresDate.toUTCString() + "; path=/";

      router.replace("/");

      toast.success(response.data.message);
    } else {
      setLoading(false);
      toast.error(response.message ? response.message : response.data.message);
    }
  };

  const addGuestCredential = () => {
    const guestCredentials = {
      email: "GuestUser@gmail.com",
      password: "1234@Guest",
    };

    userData.reset(guestCredentials);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toolbar />
      {!loading ? (
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            height: { xs: "80vh", sm: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Paper
            variant="elevation"
            elevation={5}
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: { xs: 3, md: 9 },
              p: { xs: 3, md: 5 },
              borderRadius: "5%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(loginUser)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Mobile Number/Email Id"
                    id="mobile"
                    type="phone"
                    fullWidth
                    required
                    {...register("email", {
                      required: "Mobile Number/ Email Id Required",
                      minLength: {
                        value: 10,
                        message: "Invalid Mobile Number/Email Id",
                      },
                      pattern: {
                        value: /^\S*$/,
                        message: "Space Detected",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{ inputProps: { maxLength: 30 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordField
                    placeholder="Password"
                    id="password"
                    register={register}
                    errors={!!errors.password}
                    helperText={errors.password?.message}
                    message="Password is Required"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 4, mb: 2, borderRadius: 20, fontWeight: "bold" }}
              >
                Login
              </Button>
              <Button
                type="button"
                fullWidth
                color="secondary"
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: "rgb(147 51 234)",
                  borderRadius: 20,
                  textTransform: "none",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  mb: 3,
                }}
                onClick={() => {
                  addGuestCredential();
                }}
              >
                Use Guest Credentials
              </Button>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Link href="/register">New User? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      ) : (
        <Loader />
      )}
    </ThemeProvider>
  );
};

export default LoginPage;
