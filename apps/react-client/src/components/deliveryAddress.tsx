import { useEffect, useRef, useState } from "react";
import useAddressStore from "../store/address.store";
import getAddressService from "../services/addressServices/getAddress.service";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "./addressForm";
import { addressType } from "common";
import { toast } from "sonner";
import useLogOut from "../hooks/useLogOut";

const AddAddressButton = () => {
  const [openAddAddressForm, setOpenAddAddressForm] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={() => setOpenAddAddressForm(true)}
        sx={{
          backgroundColor: "#28282B",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ":hover": {
            backgroundColor: "#484848",
          },
        }}
        startIcon={
          <AddIcon
            sx={{
              fontSize: "1.3rem",
              color: "white",
              fontWeight: "bold",
              marginBottom: "1.5px",
            }}
          />
        }
      >
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "white",
          }}
        >
          Add Address
        </Typography>
      </Button>

      <AddressForm
        addressData={null}
        formOpen={openAddAddressForm}
        setFormOpen={setOpenAddAddressForm}
        formTitle="Add New Address"
        submitType="add"
      />
    </>
  );
};

const DeliveryAddress = ({
  setCurrentCartStep,
  deliveryAddress,
  setDeliveryAddress,
}: {
  setCurrentCartStep: React.Dispatch<React.SetStateAction<string>>;
  deliveryAddress: addressType | null;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<addressType | null>>;
}) => {
  const allAddress = useAddressStore((state) => state.address);
  const addressData = useRef<addressType | null>(null);
  const setAllAddress = useAddressStore((state) => state.setAddress);

  const logOut = useLogOut();

  useEffect(() => {
    if (allAddress.length < 1) {
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
    }
  }, []);

  const EditAddressButton = ({ address }: { address: addressType }) => {
    const [openEditAddressForm, setOpenEditAddressForm] = useState(false);
    return (
      <>
        <Button
          startIcon={<EditIcon />}
          variant="contained"
          onClick={() => {
            addressData.current = address;
            setOpenEditAddressForm(true);
          }}
          sx={{ fontWeight: "bold" }}
        >
          Edit
        </Button>

        <AddressForm
          addressData={addressData.current}
          formOpen={openEditAddressForm}
          setFormOpen={setOpenEditAddressForm}
          formTitle="Edit Address"
          submitType="edit"
        />
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "6rem",
        marginTop: "-3rem",
      }}
    >
      {/* Show Address Card  */}
      {allAddress.map((address) => (
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={deliveryAddress}
          onChange={() => {
            setDeliveryAddress(address);
          }}
          key={address._id}
        >
          <FormControlLabel
            value={address}
            control={<Radio />}
            label={
              <Card
                sx={{
                  width: { xs: 299, sm: 380 },
                  height: 200,
                  marginBottom: { xs: 2, sm: 1 },
                  border: "1px solid black",
                  overflow: "clip",
                  position: "relative",
                  backgroundColor: "#DCDCDC",
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1">
                    <strong>{address.name}</strong>
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {address.street}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {address.city}, {address.state}, {address.pincode}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Country: {address.country}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Mobile: {address.mobile}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    width: "100%",
                  }}
                >
                  <EditAddressButton address={address} />
                </div>
              </Card>
            }
          />
        </RadioGroup>
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
          marginBottom: "1.5rem",
          width: { xs: 300, sm: 360 },
        }}
      >
        <AddAddressButton />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: { xs: 320, sm: 400 },
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#E5E4E2",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "gray",
            },
            marginLeft: { xs: 1, sm: 2 },
          }}
          onClick={() => {
            setCurrentCartStep("1");
          }}
        >
          <Typography sx={{ color: "black" }}>Back</Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            fontWeight: "bold",
            backgroundColor: "#0066ff",
            ":hover": {
              backgroundColor: "#0052EB  ",
            },
          }}
          onClick={() => {
            if (deliveryAddress) {
              setCurrentCartStep("3");
            } else {
              toast.error("Please Select Delivery Address");
            }
          }}
        >
          Proceed
        </Button>
      </Box>
    </div>
  );
};

export default DeliveryAddress;
