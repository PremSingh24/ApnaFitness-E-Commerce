import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useAddressStore from "../contexts/address.context";
import { useRef, useState } from "react";
import AddressForm from "./addressForm";
import removeAddressService from "../services/addressServices/removeAddress.service";
import { toast } from "sonner";
import { addressType } from "common";
import useLogOut from "../hooks/useLogOut";

const AddAddressCard = () => {
  const [openAddAddressForm, setOpenAddAddressForm] = useState(false);

  return (
    <>
      <div onClick={() => setOpenAddAddressForm(true)}>
        <Card
          sx={{
            width: 250,
            height: 200,
            margin: 2,
            border: "1px dashed",
            borderColor: "black",
            "&:hover": { cursor: "pointer" },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <AddIcon
              sx={{ fontSize: 80, color: "black", marginTop: "0.5rem" }}
            />
            <Typography
              marginTop="1rem"
              variant="h6"
              color="black"
              align="center"
              fontWeight={"bold"}
            >
              Add Address
            </Typography>
          </CardContent>
        </Card>
      </div>

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

const AddressCard = () => {
  const addressIdToDelete = useRef(null);
  const addressData = useRef<addressType | null>(null);
  const allAddress = useAddressStore((state) => state.address);

  const logOut = useLogOut();

  const RemoveAddressButton = ({ addressId }: any) => {
    const [removeAddressDialogOpen, setRemoveAddressDialog] = useState(false);
    const removeAddressContext = useAddressStore(
      (state) => state.removeAddress
    );
    const removeAddress = async () => {
      const response = await removeAddressService(addressIdToDelete.current);
      if (response.status === 200) {
        toast.success(response.data.message);
        removeAddressContext(addressIdToDelete.current);
      } else if (response.status === 401) {
        await logOut();
        toast.error("Session Expired, Login Again!");
      } else {
        toast.error(
          response.message ? response.message : response.data.message
        );
      }

      addressIdToDelete.current = null;
    };
    return (
      <>
        <Button
          color="error"
          onClick={() => {
            addressIdToDelete.current = addressId;
            setRemoveAddressDialog(true);
          }}
          startIcon={<DeleteIcon />}
          variant="text"
        >
          Delete
        </Button>

        <Dialog
          open={removeAddressDialogOpen}
          onClose={() => setRemoveAddressDialog(false)}
        >
          <DialogTitle>Delete Address</DialogTitle>

          <DialogContent>Do You Want to Delete This Address?</DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                removeAddress();
                setRemoveAddressDialog(false);
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setRemoveAddressDialog(false);
                addressIdToDelete.current = null;
              }}
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  const EditAddressButton = ({ address }: { address: addressType }) => {
    const [openEditAddressForm, setOpenEditAddressForm] = useState(false);
    return (
      <>
        <Button
          startIcon={<EditIcon />}
          variant="text"
          onClick={() => {
            addressData.current = address;
            setOpenEditAddressForm(true);
          }}
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
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "4rem",
      }}
    >
      <AddAddressCard />

      {/* Show Address Card  */}
      {allAddress.map((address) => (
        <Card
          sx={{
            width: { xs: "100%", sm: 280 },
            height: 200,
            margin: { xs: 2, sm: 2.3 },
            border: "1px solid black",
            overflow: "clip",
            position: "relative",
          }}
          key={address._id}
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
              bottom: 0,
              width: "100%",
            }}
          >
            <EditAddressButton address={address} />
            <Divider
              orientation="vertical"
              sx={{
                width: "1px",
                backgroundColor: "black",
                height: "3vh",
              }}
            />

            <RemoveAddressButton addressId={address._id} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AddressCard;
