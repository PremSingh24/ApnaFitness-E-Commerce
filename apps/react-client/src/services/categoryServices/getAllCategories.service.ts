import axios from "axios";

const getAllCategoriesService = async () => {
  try {
    return await axios.get("/api/v1/category/all");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return error.response.data;
      }
    }

    return { message: "Something Went Wrong" };
  }
};

export default getAllCategoriesService;
