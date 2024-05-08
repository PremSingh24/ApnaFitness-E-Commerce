import axios from "axios";
import { addressType } from "common";
import refreshAccessTokenService from "../authServices/refreshAccessToken.service";

const addAddressService = async (address: addressType): Promise<any> => {
  try {
    return await axios.post(`/api/v1/address/newaddress`, address);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        // Token expired, try refreshing tokens
        const accessTokenRefreshed = await refreshAccessTokenService();
        if (accessTokenRefreshed.success) {
          // Retry with new access token

          return await addAddressService(address);
        } else {
          // Handle case where refresh token also expired
          return accessTokenRefreshed.response;
        }
      } else if (error.response) {
        return error.response;
      }
    }

    return { message: "Something Went Wrong" };
  }
};

export default addAddressService;
