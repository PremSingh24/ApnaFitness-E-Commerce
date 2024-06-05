import axios from "axios";
import refreshAccessTokenService from "../authServices/refreshAccessToken.service";

const updateCartService = async (
  CartId: any,
  quantity: number
): Promise<any> => {
  try {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${CartId}`,
      {
        quantity,
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        // Token expired, try refreshing tokens
        const accessTokenRefreshed = await refreshAccessTokenService();
        if (accessTokenRefreshed.success) {
          // Retry with new access token

          return await updateCartService(CartId, quantity);
        } else {
          // Handle case where refresh token also expired
          return accessTokenRefreshed.response;
        }
      } else if (error.response) {
        return error.response.data;
      }
    }

    return { message: "Something Went Wrong" };
  }
};

export default updateCartService;
