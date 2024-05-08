import axios from "axios";
import refreshAccessTokenService from "../authServices/refreshAccessToken.service";

const removeFromCartService = async (CartId: any): Promise<any> => {
  try {
    return await axios.delete(`/api/v1/cart/${CartId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        // Token expired, try refreshing tokens
        const accessTokenRefreshed = await refreshAccessTokenService();
        if (accessTokenRefreshed.success) {
          // Retry with new access token

          return await removeFromCartService(CartId);
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

export default removeFromCartService;
