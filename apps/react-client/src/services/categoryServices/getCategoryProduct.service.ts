import axios from "axios";

const getCategoryProductService = async (CategoryId: any): Promise<any> => {
  try {
    return await axios.get(`/api/v1/category/${CategoryId}`);
  } catch (error) {
    return error;
  }
};

export default getCategoryProductService;
