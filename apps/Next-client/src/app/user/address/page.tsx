"use client";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "sonner";
import useAddressStore from "../../../store/address.store";
import useLogOut from "../../../hooks/useLogOut";
import getAddressService from "../../../services/addressServices/getAddress.service";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const AddressCard = dynamic(() => import("../../../components/addressCard"), {
  ssr: false,
});

const AddressTab = () => {
  const router = useRouter();
  useEffect(() => {
    const loggedIn = document.cookie === "loggedIn=true";

    if (!loggedIn) {
      router.replace("/login");
      return;
    }
  }, []);

  const setAllAddress = useAddressStore((state) => state.setAddress);

  const logOut = useLogOut();

  useEffect(() => {
    (async () => {
      const response = await getAddressService();

      if (response.status === 200) {
        setAllAddress(response.data.address);
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
        My Addresses
      </Typography>
      <AddressCard />
    </>
  );
};

export default AddressTab;
