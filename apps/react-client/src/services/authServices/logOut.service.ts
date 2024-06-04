import axios from "axios";
axios.defaults.withCredentials = true;

const logOutService = async (): Promise<any> => {
  try {
    return await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/logOut`
    );
  } catch (error) {
    return { message: "Something Went Wrong" };
  }
};

export default logOutService;
