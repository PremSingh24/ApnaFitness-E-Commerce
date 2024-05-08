import axios from "axios";

const logOutService = async (): Promise<any> => {
  try {
    return await axios.delete("/api/v1/auth/logOut");
  } catch (error) {
    return { message: "Something Went Wrong" };
  }
};

export default logOutService;
