import axios from "axios";

const getAllProductService = async () => {
  try {
    return await axios.get(`/api/v1/products/all`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return error.response.data;
      }
    }

    return { message: "Something went wrong!" };
  }
};

export default getAllProductService;
