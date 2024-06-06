import useOrderStore from "../store/order.store";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const OrderCard = () => {
  const orders = useOrderStore((state) => state.orders);

  return (
    <>
      {orders.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",

            marginBottom: "4rem",
          }}
        >
          {orders.map((order) => (
            <Card
              sx={{
                width: { xs: 350, sm: 380 },
                height: 525,
                margin: "10px",
                borderRadius: "6px",
              }}
              key={order._id}
              elevation={6}
            >
              <CardContent>
                <Typography fontSize={"1rem"} color="green" fontWeight={"bold"}>
                  {order.status}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  Order Date: {order.createdAt.split("T")[0]}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  fontWeight={"bold"}
                  marginBottom={"0.5rem"}
                >
                  Order ID: {order._id}
                </Typography>

                <div style={{ display: "flex" }}>
                  <Link
                    href={`/products/${order.product._id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Image
                      src={order.product.image}
                      alt="Order Item"
                      width={90}
                      height={90}
                      style={{ marginRight: 16 }}
                    />
                  </Link>
                  <div>
                    <Typography variant="body1" fontWeight={"bold"}>
                      {order.product.title}
                    </Typography>
                    <Typography variant="body1">
                      Quantity: {order.product.quantity.toString()}
                    </Typography>
                    <Typography variant="body1">
                      Price: ₹{order.product.price.toString()}
                    </Typography>
                  </div>
                </div>

                <Divider sx={{ mb: 2, mt: 1 }} />

                {/*Delivery Address Section */}

                <Typography
                  fontSize={"1.1rem"}
                  fontWeight={"bold"}
                  gutterBottom
                >
                  Delivery Address:
                </Typography>
                <Typography fontSize={"1.1rem"} gutterBottom>
                  {order.deliveryAddress.name}
                </Typography>
                <Typography fontSize={"14px"}>
                  {order.deliveryAddress.street}
                </Typography>
                <Typography fontSize={"14px"}>
                  {order.deliveryAddress.state}, {order.deliveryAddress.city} -
                  {order.deliveryAddress.pincode}
                </Typography>
                <Typography fontSize={"14px"}>
                  {order.deliveryAddress.country}
                </Typography>
                <Typography fontSize={"14px"}>
                  Mobile: {order.deliveryAddress.mobile}
                </Typography>
                <Divider sx={{ mt: 1, mb: 1.5 }} />

                {/*Price Details Section */}
                <Typography
                  fontSize={"1.1rem"}
                  fontWeight={"bold"}
                  gutterBottom
                >
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
                    Price ({order.product.quantity.toString()} items):
                  </Typography>
                  <Typography
                    fontSize={"14px"}
                    marginRight={"50px"}
                    gutterBottom
                  >
                    ₹{order.product.price.toString()}
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
                  <Typography
                    fontSize={"14px"}
                    marginRight={"50px"}
                    gutterBottom
                  >
                    ₹{order.priceDetails.discount.toString()}
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
                  <Typography
                    fontSize={"14px"}
                    marginRight={"50px"}
                    gutterBottom
                  >
                    ₹{order.priceDetails.deliveryCharge.toString()}
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
                    ₹{order.priceDetails.totalAmount.toString()}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Typography
          variant="h5"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          You Haven't Placed an Order Yet!
        </Typography>
      )}
    </>
  );
};

export default OrderCard;
