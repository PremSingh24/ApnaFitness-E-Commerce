"use client";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { addressType } from "common";
import useCartStore from "../../store/cart.store";
import CartProduct from "../../components/cartProduct";
import CartSummary from "../../components/cartSummary";
import DeliveryAddress from "../../components/deliveryAddress";
import OrderSummary from "../../components/orderSummary";

const theme = createTheme();

const CartPage = () => {
  const [currentCartStep, setCurrentCartStep] = useState("1");
  const [orderItems, setOrderItems] = useState<any>([]);
  const [orderPrice, setOrderPrice] = useState<number>(0);

  const [deliveryAddress, setDeliveryAddress] = useState<addressType | null>(
    null
  );
  const cart = useCartStore((state) => state.cart);

  const currentPageTitle = () => {
    switch (currentCartStep) {
      case "1":
        if (cart.length > 0) {
          return `My Cart (${cart.length})`;
        } else {
          return `My Cart `;
        }

      case "2":
        return "Choose An Address";
      case "3":
        return "Order Summary";
      default:
        return "My Cart";
    }
  };

  const CurrentCartStepComponent = () => {
    switch (currentCartStep) {
      case "1":
        return (
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={12} md={7} lg={5} sx={{ width: "50%" }}>
              <CartProduct />
            </Grid>
            <Grid item xs={12} md={4}>
              <CartSummary
                setCurrentCartStep={setCurrentCartStep}
                setOrderItems={setOrderItems}
                setOrderPrice={setOrderPrice}
              />
            </Grid>
          </Grid>
        );
      case "2":
        return (
          <DeliveryAddress
            setCurrentCartStep={setCurrentCartStep}
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
          />
        );
      case "3":
        return (
          <OrderSummary
            setCurrentCartStep={setCurrentCartStep}
            orderItems={orderItems}
            deliveryAddress={deliveryAddress}
            orderPrice={orderPrice}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          marginTop: { xs: "6rem", md: "4.5rem" },
          mb: { xs: "4rem", sm: "1rem", md: "2rem" },
        }}
      >
        <Stack
          direction={"row"}
          gap={1}
          padding={"5px"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            color={"black"}
            variant="h4"
            textAlign={"center"}
            paddingTop={"10px"}
            fontWeight={"bold"}
          >
            {currentPageTitle()}
          </Typography>
          {currentCartStep === "1" ? (
            <ShoppingCartIcon
              sx={{ fontSize: "2.6rem", marginTop: "10px" }}
              color="info"
            />
          ) : null}
        </Stack>
        {cart.length > 0 ? (
          <div>
            <Toolbar />
            <CurrentCartStepComponent />
          </div>
        ) : (
          <Stack
            direction={"column"}
            gap={1}
            padding={"5px"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              color={"black"}
              variant="h4"
              textAlign={"center"}
              padding={"10px"}
              marginTop={"60px"}
            >
              Cart is Empty
            </Typography>
            <Link href={"/"} replace={true}>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  background: "#0073e6",
                }}
              >
                Continue Shopping
              </Button>
            </Link>
          </Stack>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CartPage;
