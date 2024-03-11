import { Typography } from "@mui/material";
import AddressCard from "../components/addressCard";
import useAddressStore from "../contexts/address.context";
import { useEffect } from "react";
import getAddressService from "../services/addressServices/getAddress.service";

const AddressTab = () => {
  const setAllAddress = useAddressStore((state) => state.setAddress);

  useEffect(() => {
    (async () => {
      const response = await getAddressService();

      if (response.status === 200) {
        setAllAddress(response.data.address);
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
