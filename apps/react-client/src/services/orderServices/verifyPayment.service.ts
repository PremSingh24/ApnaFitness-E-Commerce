import axios from "axios";
import { addressType } from "common";

const verifyPaymentService = async (
  response: any,
  deliveryAddress: addressType
) => {
  try {
    return await axios.post(
      `/api/v1/order/verifyPayment`,
      { response, deliveryAddress },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error && error.response) {
        return error.response.data;
      }
    }

    return { message: "Something Went Wrong" };
  }
};

export default verifyPaymentService;
