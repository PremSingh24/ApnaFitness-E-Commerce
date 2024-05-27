import axios from "axios";

const getTrendingProductService = async () => {
  try {
    return await axios.get(`/api/v1/products/trending`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return error.response.data;
      }
    }

    return { message: "Something went wrong!" };
  }
};

export default getTrendingProductService;
