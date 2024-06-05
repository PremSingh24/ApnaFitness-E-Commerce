import axios from "axios";
import { registerUserType } from "common";
axios.defaults.withCredentials = true;

export const registerUserService = async (userData: registerUserType) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/register`,
      userData
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return error.response.data;
      }
    }

    return { message: "Something Went Wrong!" };
  }
};
