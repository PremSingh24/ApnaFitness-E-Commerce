import axios from "axios";
import { addressType, cartType } from "common";

const verifyOrderService = async (
  cart: cartType,
  amount: number,
  deliveryAddress: addressType
) => {
  try {
    return await axios.post(
      `/api/v1/order/verifyOrder`,
      { cart, amount, deliveryAddress },
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

export default verifyOrderService;
