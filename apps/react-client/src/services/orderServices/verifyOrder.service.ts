import axios from "axios";
import { addressType, cartType } from "common";
import refreshAccessTokenService from "../authServices/refreshAccessToken.service";

const verifyOrderService = async (
  cart: cartType[],
  amount: number,
  deliveryAddress: addressType
): Promise<any> => {
  try {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/verifyOrder`,
      {
        cart,
        amount,
        deliveryAddress,
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        // Token expired, try refreshing tokens
        const accessTokenRefreshed = await refreshAccessTokenService();
        if (accessTokenRefreshed.success) {
          // Retry with new access token

          return await verifyOrderService(cart, amount, deliveryAddress);
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

export default verifyOrderService;
