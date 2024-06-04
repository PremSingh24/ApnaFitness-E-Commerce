import axios from "axios";
axios.defaults.withCredentials = true;

const refreshAccessTokenService = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/refreshToken`
    );

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
