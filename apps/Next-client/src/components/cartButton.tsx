import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useCartStore from "../store/cart.store";
import addToCartService from "../services/cartServices/addToCart.service";
import useLogOut from "../hooks/useLogOut";
import { productType } from "common";
import useAuth from "../utils/auth";

const CartButton = ({ product }: { product: productType }) => {
  const cart = useCartStore((state) => state.cart);
  const addToCartContext = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const loggedIn = useAuth();

  const logOut = useLogOut();

  const addToCart = async (product: any, ProductId: any) => {
    const response = await addToCartService(ProductId);
    if (response.status === 201) {
      addToCartContext(product, response.data.cartId);
      toast.success(response.data.message);
    } else if (response.status === 401) {
      await logOut();
      toast.error("Session Expired, Login Again!");
    } else {
      toast.error(response.message ? response.message : response.data.message);
    }
  };

  return (
    <>
      {product.inStock ? (
        cart.find((obj) => obj.item._id === product._id) ? (
          <Button
            variant="outlined"
            size="medium"
            fullWidth
            onClick={() =>
              loggedIn ? router.push("/cart") : router.push("/login")
            }
          >
            Go To Cart
          </Button>
        ) : (
          <Button
            variant="contained"
            size="medium"
            fullWidth
            onClick={() =>
              loggedIn ? addToCart(product, product._id) : router.push("/login")
            }
          >
            Add To Cart
          </Button>
        )
      ) : (
        <Button
          variant="contained"
          size="medium"
          color="error"
          fullWidth
          disabled
        >
          Out Of Stock
        </Button>
      )}
    </>
  );
};

export default CartButton;
