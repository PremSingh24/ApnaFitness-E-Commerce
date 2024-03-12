import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { addressType } from "common";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import addAddressService from "../services/addressServices/addNewAddress.service";
import { toast } from "sonner";
import updateAddressService from "../services/addressServices/updateAddress.service";
import useAddressStore from "../contexts/address.context";
import { useEffect, useState } from "react";

const AddressForm = ({
  addressData,
  formOpen,
  setFormOpen,
  formTitle,
  submitType,
}: {
  addressData: addressType | null;
  formOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formTitle: string;
  submitType: string;
}) => {
  const addToGlobalAddressState = useAddressStore((state) => state.addAdress);
  const updateGlobalAddressState = useAddressStore(
    (state) => state.updateAddress
  );
  const [manualDirty, setManualDirty] = useState(false);

  const addressFormState = useForm<addressType>({
    defaultValues: {
      name: addressData ? addressData.name : "",
      mobile: addressData ? addressData.mobile : "",
      street: addressData ? addressData.street : "",
      city: addressData ? addressData.city : "",
      state: addressData ? addressData.state : "",
      country: "India",
      pincode: addressData ? addressData.pincode : "",
      _id: addressData ? addressData._id : "",
    },
  });

  useEffect(() => {
    if (addressData) {
      addressFormState.reset({
        name: addressData.name,
        mobile: addressData.mobile,
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode,
        country: "India",
        _id: addressData._id,
      });
    }
  }, [addressData]);

  const resetForm = () => {
    addressFormState.reset({
      name: "",
      mobile: "",
      street: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      _id: "",
    });
  };

  const { register, handleSubmit, getValues, formState } = addressFormState;

  const { errors } = formState;

  const setDummyAddress = async () => {
    const dummyAddress = {
      name: "Ramesh Kumar",
      mobile: "9876543210",
      street: "123 Gandhi Road",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400001",
      _id: "",
    };

    addressFormState.reset(dummyAddress);
    setManualDirty(true);
  };

  const saveAddress = async (data: addressType) => {
    if (submitType === "add") {
      const { name, mobile, street, city, state, country, pincode } = data;
      const response = await addAddressService({
        name,
        mobile,
        street,
        city,
        state,
        country,
        pincode,
      });

      if (response.status === 201) {
        toast.success(response.data.message);

        addToGlobalAddressState({ ...data, _id: response.data.addressId });
        resetForm();
        setFormOpen(false);
      } else if (response.status === 400) {
        toast.error("Invalid Address Format");
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await updateAddressService(addressData?._id, data);
      if (response.status === 200) {
        toast.success(response.data.message);
        updateGlobalAddressState(data._id, data);
        resetForm();
        setFormOpen(false);
      } else if (response.status === 400) {
        toast.error("Invalid Address Format");
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <Dialog
      open={formOpen}
      sx={{
        margin: "auto",
        width: { xs: "100%", sm: "560px" },
        height: { xs: "1000px", sm: "850px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DialogTitle
        variant="h5"
        fontWeight={"bold"}
        mt={-1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        {formTitle}
        <IconButton
          name="close-address-form"
          onClick={() => {
            setFormOpen(false);
            setManualDirty(false);
            setTimeout(() => {
              if (submitType === "add") {
                resetForm();
              } else {
                if (addressData) {
                  addressFormState.reset(addressData);
                }
              }
            }, 200);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(saveAddress)}
        sx={{ mt: -1, p: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              placeholder="Full Name"
              defaultValue={getValues("name")}
              id="FullName"
              type="text"
              fullWidth
              size="small"
              required
              autoComplete="name"
              {...register("name", {
                required: "Name is Required",
                minLength: { value: 2, message: "Minumum 2 Characters" },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Spcial Characters Detected",
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{ inputProps: { maxLength: 25 } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              placeholder="Mobile Number"
              defaultValue={getValues("mobile")}
              prefix="+91"
              id="mobile"
              size="small"
              fullWidth
              required
              autoComplete="mobile"
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
          <Grid item xs={12} sm={12}>
            <TextField
              placeholder="Street Name"
              defaultValue={getValues("street")}
              id="StreetName"
              type="text"
              size="small"
              fullWidth
              required
              autoComplete="street-address"
              {...register("street", {
                required: "Street Name is Required",
                minLength: { value: 5, message: "Minumum 5 Characters" },
                pattern: {
                  value: /^[^`!@#$%^*,]+$/,
                  message: "Spcial Characters Detected",
                },
              })}
              error={!!errors.street}
              helperText={errors.street?.message}
              InputProps={{ inputProps: { maxLength: 25 } }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              placeholder="City Name"
              defaultValue={getValues("city")}
              id="CItyName"
              type="text"
              size="small"
              fullWidth
              required
              {...register("city", {
                required: "City Name is Required",
                minLength: { value: 2, message: "Minumum 2 Characters" },
                pattern: {
                  value: /^[^`!@#$%^*,]+$/,
                  message: "Spcial Characters Detected",
                },
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
              InputProps={{ inputProps: { maxLength: 25 } }}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              placeholder="State Name"
              defaultValue={getValues("state")}
              id="StateName"
              type="text"
              fullWidth
              size="small"
              required
              {...register("state", {
                required: "State Name is Required",
                minLength: { value: 3, message: "Minumum 3 Characters" },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Spcial Characters Detected",
                },
              })}
              error={!!errors.state}
              helperText={errors.state?.message}
              InputProps={{ inputProps: { maxLength: 15 } }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              defaultValue="India"
              fullWidth
              size="small"
              id="Country"
              inputProps={{ readOnly: true }}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              placeholder="ZipCode"
              defaultValue={getValues("pincode")}
              id="PinCode"
              type="text"
              fullWidth
              size="small"
              required
              autoComplete="postal-code"
              {...register("pincode", {
                required: "Pincode is Required",
                minLength: { value: 6, message: "Minumum 6 Characters" },
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Please Enter a Valid PinCode",
                },
              })}
              error={!!errors.pincode}
              helperText={errors.pincode?.message}
              InputProps={{ inputProps: { maxLength: 6 } }}
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          {submitType === "add" ? (
            <Button
              size="medium"
              variant="contained"
              sx={{
                mt: 2,
                mb: 1,
                borderRadius: 2,
                mr: 1,
                color: "black",
                backgroundColor: "#D0D0D0",
                fontWeight: "bold",
                ":hover": { backgroundColor: "#B0B0B0" },
              }}
              onClick={() => setDummyAddress()}
            >
              Dummy Address
            </Button>
          ) : null}

          <Button
            type="submit"
            size="medium"
            variant="contained"
            sx={{ mt: 2, mb: 1, borderRadius: 2, fontWeight: "bold" }}
            disabled={formState.isDirty || manualDirty ? false : true}
          >
            Save
          </Button>
        </div>
      </Box>
    </Dialog>
  );
};

export default AddressForm;
