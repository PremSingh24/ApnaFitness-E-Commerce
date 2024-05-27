import axios from "axios";

const getProductService = async (ProductId: string) => {
  try {
    return await axios.get(`/api/v1/products/${ProductId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return error.response.data;
      }
    }

    return { message: "Something went wrong!" };
  }
};

export default getProductService;
