"use client";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "sonner";
import useOrderStore from "../../../store/order.store";
import useLogOut from "../../../hooks/useLogOut";
import getOrdersService from "../../../services/orderServices/getOrders.service";
import { useRouter } from "next/navigation";
import OrderCard from "../../../components/orderCard";

const OrdersTab = () => {
  const router = useRouter();
  useEffect(() => {
    const loggedIn = document.cookie === "loggedIn=true";

    if (!loggedIn) {
      router.replace("/login");
      return;
    }
  }, []);

  const setOrders = useOrderStore((state) => state.setOrders);

  const logOut = useLogOut();

  useEffect(() => {
    (async () => {
      const response = await getOrdersService();
      if (response.status === 200) {
        setOrders(response.data.orders);
      } else if (response.status === 401) {
        await logOut();
        toast.error("Session Expired, Login Again!");
      } else {
        toast.error(
          response?.message ? response.message : response.data.message
        );
      }
    })();
  }, []);
  return (
    <>
      <Typography
        variant="h5"
        marginBottom={"1.5rem"}
        alignItems={"center"}
        display={"flex"}
        justifyContent={"center"}
        marginTop={"1rem"}
        fontWeight={"bold"}
      >
        My Orders
      </Typography>
      <OrderCard />
    </>
  );
};

export default OrdersTab;
