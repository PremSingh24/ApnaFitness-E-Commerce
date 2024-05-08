import axios from "axios";
import refreshAccessTokenService from "../authServices/refreshAccessToken.service";

const getCartService = async (): Promise<any> => {
  try {
    return await axios.get("/api/v1/cart/myCart");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        // Token expired, try refreshing tokens
        const accessTokenRefreshed = await refreshAccessTokenService();
        if (accessTokenRefreshed.success) {
          // Retry with new access token

          return await getCartService();
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

export default getCartService;
