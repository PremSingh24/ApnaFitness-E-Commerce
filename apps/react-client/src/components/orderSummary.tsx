"use client";
import { addressType, cartType } from "common";
import verifyOrderService from "../services/orderServices/verifyOrder.service";
import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import useUserStore from "../store/user.store";
import logo from "../assets/logo.webp";
import { toast } from "sonner";
import verifyPaymentService from "../services/orderServices/verifyPayment.service";
import useCartStore from "../store/cart.store";
import useLogOut from "../hooks/useLogOut";
import { useRouter } from "next/navigation";
import Image from "next/image";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const OrderSummary = ({
  setCurrentCartStep,
  orderItems,
  deliveryAddress,
  orderPrice,
}: {
  setCurrentCartStep: React.Dispatch<React.SetStateAction<string>>;
  orderItems: cartType[];
  deliveryAddress: addressType | null;
  orderPrice: number;
}) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setCart = useCartStore((state) => state.setCart);

  const logOut = useLogOut();

  const verifyOrder = async (amount: number) => {
    if (deliveryAddress) {
      const response = await verifyOrderService(
        orderItems,
        amount,
        deliveryAddress
      );

      if (response.status === 200) {
        placeOrder(response.data.key, response.data.order);
      } else if (response.status === 401) {
        await logOut();
        toast.error("Session Expired, Login Again!");
      } else {
        toast.error(
          response?.message ? response.message : response.data.message
        );
      }
    }
  };

  const placeOrder = async (key: string, order: any) => {
    const response = await loadSdk();

    if (response) {
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: "Apna Fitness",
        description: "Test Transaction",
        image: logo,
        order_id: order.id,
        handler: async (response: any) => {
          if (deliveryAddress) {
            const res = await verifyPaymentService(response, deliveryAddress);

            if (res.status === 201) {
              setCart([]);
              router.push("/user/myOrders");
            } else if (response.status === 401) {
              await logOut();
              toast.error("Session Expired, Login Again!");
            } else {
              toast.error(
                response?.message ? response.message : response.data.message
              );
            }
          }
        },
        prefill: {
          name: user.firstName + " " + user.lastName,
          email: user.email,
          contact: "+91" + user.mobile,
        },
        notes: {
          address: deliveryAddress,
        },
        theme: {
          color: "#1E90FF",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const loadSdk = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  if (orderItems && deliveryAddress) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-3rem",
        }}
      >
        <Card
          sx={{
            width: { xs: 350, sm: 380 },
            margin: "10px",
            borderRadius: "6px",
          }}
          elevation={6}
        >
          <CardContent>
            {orderItems.map((order: any) => (
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                  marginBottom: "7px",
                }}
                key={order._id}
              >
                <Image
                  src={order.item.image}
                  alt="Order Item"
                  style={{ width: 90, height: 90, marginRight: 16 }}
                />
                <div>
                  <Typography variant="body1" fontWeight={"bold"}>
                    {order.item.title}
                  </Typography>
                  <Typography variant="body1">
                    Quantity: {order.quantity}
                  </Typography>
                  <Typography variant="body1">
                    Price: ₹{order.item.currentPrice}
                  </Typography>
                </div>
              </div>
            ))}

            <Divider sx={{ mb: 2 }} />

            {/*Delivery Address Section */}

            <Typography fontSize={"1.1rem"} fontWeight={"bold"} gutterBottom>
              Delivery Address:
            </Typography>
            <Typography fontSize={"1.1rem"} gutterBottom>
              {deliveryAddress.name}
            </Typography>
            <Typography fontSize={"14px"}>{deliveryAddress.street}</Typography>
            <Typography fontSize={"14px"}>
              {deliveryAddress.state}, {deliveryAddress.city} -
              {deliveryAddress.pincode}
            </Typography>
            <Typography fontSize={"14px"}>{deliveryAddress.country}</Typography>
            <Typography fontSize={"14px"}>
              Mobile: {deliveryAddress.mobile}
            </Typography>
            <Divider sx={{ mt: 1, mb: 1.5 }} />

            {/*Price Details Section */}
            <Typography fontSize={"1.1rem"} fontWeight={"bold"} gutterBottom>
              Price Details:
            </Typography>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={"14px"} gutterBottom>
                Price ({orderItems.length} items):
              </Typography>
              <Typography fontSize={"14px"} marginRight={"50px"} gutterBottom>
                ₹{orderPrice}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={"14px"} gutterBottom>
                Discount:
              </Typography>
              <Typography fontSize={"14px"} marginRight={"50px"} gutterBottom>
                -
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={"14px"} gutterBottom>
                Delivery Charge:
              </Typography>
              <Typography fontSize={"14px"} marginRight={"50px"} gutterBottom>
                ₹{orderItems.length * 45}
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={"15px"} fontWeight="bold">
                Total Amount:
              </Typography>
              <Typography
                fontSize={"15px"}
                fontWeight="bold"
                marginRight={"50px"}
              >
                ₹{orderPrice + orderItems.length * 45}
              </Typography>
            </div>
          </CardContent>
          <Divider sx={{ mb: 2 }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "92%",
                marginBottom: "1rem",
                backgroundColor: "#0066ff",
                fontWeight: "bold",
                ":hover": {
                  backgroundColor: "#0052EB  ",
                },
              }}
              onClick={() => {
                verifyOrder(orderPrice + orderItems.length * 45);
              }}
            >
              Place Order
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "92%",
                marginBottom: "1rem",
                backgroundColor: "#BEBEBE",
                ":hover": {
                  backgroundColor: "gray",
                },
              }}
              onClick={() => {
                setCurrentCartStep("2");
              }}
            >
              <Typography sx={{ color: "black" }}>Back</Typography>
            </Button>
          </div>
        </Card>
      </div>
    );
  } else {
    return (
      <Typography
        variant="h3"
        fontWeight={"bold"}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Something Went Wrong! Try Again Later
      </Typography>
    );
  }
};

export default OrderSummary;
