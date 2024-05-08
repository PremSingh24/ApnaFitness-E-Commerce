import axios from "axios";
import refreshAccessTokenService from "../authServices/refreshAccessToken.service";

const getWishlistService = async (): Promise<any> => {
  try {
    return await axios.get("/api/v1/wishlist/myWishlist");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        // Token expired, try refreshing tokens
        const accessTokenRefreshed = await refreshAccessTokenService();
        if (accessTokenRefreshed.success) {
          // Retry with new access token

          return await getWishlistService();
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

export default getWishlistService;
