import axios from "axios";

const refreshAccessTokenService = async () => {
  try {
    await axios.post("/api/v1/auth/refreshToken");

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return { success: false, response: error.response };
      }
    }

    return { success: false, message: "Something Went Wrong!" };
  }
};
export default refreshAccessTokenService;
