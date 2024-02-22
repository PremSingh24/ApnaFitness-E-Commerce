import axios from "axios";
import { addressType } from "common";

const updateAddressService = async (AddressId: any, address: addressType) => {
  try {
    return await axios.put(`/api/v1/address/${AddressId}`, address, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return error.response.data;
      }
    }

    return { message: "Something Went Wrong" };
  }
};

export default updateAddressService;
