import { Typography } from "@mui/material";
import AddressCard from "../components/addressCard";
import useAddressStore from "../store/address.store";
import { useEffect } from "react";
import getAddressService from "../services/addressServices/getAddress.service";
import { toast } from "sonner";
import useLogOut from "../hooks/useLogOut";

const AddressTab = () => {
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
