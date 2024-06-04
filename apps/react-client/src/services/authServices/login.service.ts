import axios from "axios";
import { loginUserType } from "common";

axios.defaults.withCredentials = true;

const loginUserService = async (loginUser: loginUserType) => {
  try {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`,
      loginUser
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return error.response.data;
      }
    }

    return { message: "Something Went Wrong!" };
  }
};

export default loginUserService;
