"use client";
import { registerUserType } from "common";
import Avatar from "@mui/material/Avatar";
import { TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useLoginStore from "../../../store/login.store";
import { registerUserService } from "../../../services/authServices/register.service";
import PasswordField from "../../../components/passwordField";
import { useEffect, useState } from "react";
import Loader from "../../../components/loader";

const defaultTheme = createTheme();

const RegisterPage = () => {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = document.cookie === "loggedIn=true";

    if (loggedIn) {
      router.replace("/");
      return;
    }
  }, []);

  const setLogin = useLoginStore((state) => state.setLogin);

  const [loading, setLoading] = useState<boolean>(false);

  const userData = useForm<registerUserType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register, handleSubmit, formState } = userData;

  const { errors } = formState;

  const registerUser = async (data: registerUserType) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords Don't Match");
    } else {
      let response;
      if (data.email === "") {
        setLoading(true);
        const { firstName, lastName, mobile, password } = data;

        response = await registerUserService({
          firstName,
          lastName,
          mobile,
          password,
        });
      } else {
        setLoading(true);
        response = await registerUserService(data);
      }

      if (response.status === 201) {
        setLogin();
        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 1);
        document.cookie =
          "loggedIn=true; expires=" + expiresDate.toUTCString() + "; path=/";

        router.replace("/");
        toast.success(response.data.message);
      } else {
        setLoading(false);
        toast.error(
          response.message ? response.message : response.data.message
        );
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {!loading ? (
        <Container
          component="main"
          maxWidth="xs"
          sx={{ marginTop: { xs: "8rem", md: "6rem" } }}
        >
          <CssBaseline />
          <Paper
            variant="elevation"
            elevation={24}
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: { xs: 3, md: 6 },
              p: { xs: 3, md: 4 },
              borderRadius: "7%",
            }}
          >
            <Avatar sx={{ m: 0, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(registerUser)}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    id="firstName"
                    type="text"
                    fullWidth
                    required
                    {...register("firstName", {
                      required: "First Name is Required",
                      minLength: { value: 2, message: "Minimum 2 Characters" },
                      pattern: {
                        value: /^\S*$/,
                        message: "Space Detected",
                      },
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    InputProps={{ inputProps: { maxLength: 25 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    id="lastName"
                    type="text"
                    fullWidth
                    required
                    {...register("lastName", {
                      required: "Last Name is Required",
                      minLength: { value: 2, message: "Minimum 2 Characters" },
                      pattern: {
                        value: /^\S*$/,
                        message: "Space Detected",
                      },
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    InputProps={{ inputProps: { maxLength: 25 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mobile Number"
                    prefix="+91"
                    id="mobile"
                    fullWidth
                    required
                    {...register("mobile", {
                      required: "Mobile Number is Required",
                      minLength: {
                        value: 10,
                        message: "There are less than 10 digits",
                      },
                      pattern: {
                        value:
                          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                        message: "Please Enter a Valid Mobile Number",
                      },
                    })}
                    error={!!errors.mobile}
                    helperText={errors.mobile?.message}
                    InputProps={{ inputProps: { maxLength: 10 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email (Optional)"
                    id="email"
                    placeholder="AmanGupta@gmail.com"
                    type="email"
                    fullWidth
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
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
                <Grid item xs={12}>
                  <PasswordField
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    register={register}
                    errors={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    message="Confirm Your Password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login">Already a User? Log in</Link>
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

export default RegisterPage;
