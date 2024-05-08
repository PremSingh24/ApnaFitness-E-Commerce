import { useEffect } from "react";
import useCartStore from "../store/cart.store";
import useLoginStore from "../store/login.store";
import useUserStore from "../store/user.store";
import useWishlistStore from "../store/wishlist.store";
import useLogOut from "./useLogOut";
import authenticateService from "../services/authServices/authenticate.service";
import { toast } from "sonner";
import getCartService from "../services/cartServices/getCart.service";
import getWishlistService from "../services/wishlistServices/getWishlist.service";

const useFetchUserCartAndWishlist = () => {
  const setUser = useUserStore((state) => state.setUser);

  const loggedIn =
    useLoginStore((state) => state.login) ||
    document.cookie === "loggedIn=true";
  const setLogin = useLoginStore((state) => state.setLogin);

  const setCartContext = useCartStore((state) => state.setCart);
  const setWishlistContext = useWishlistStore((state) => state.setWishlist);

  const logOut = useLogOut();

  useEffect(() => {
    (async () => {
      // Getting the Cart, and Wishlist of the user
      if (loggedIn) {
        const response = await authenticateService();

        if (response.status !== 200) {
          await logOut();
          toast.error("Session Expired, Login Again");
        } else {
          setLogin();
          let user;
          if (response.data.sendUser.email) {
            user = response.data.sendUser;
          } else {
            user = { ...response.data.sendUser, email: "" };
          }
          setUser(user);
          const cartResponse = await getCartService();

          if (cartResponse.status === 200) {
            setCartContext(cartResponse.data.products);
          } else if (cartResponse.status === 401) {
            await logOut();
            toast.error("Session Expired, Login Again!");
          } else {
            toast.error(
              response?.message ? response.message : response.data.message
            );
          }

          const wishlistResponse = await getWishlistService();

          if (wishlistResponse.status === 200) {
            setWishlistContext(wishlistResponse.data.products);
          } else if (response.status === 401) {
            await logOut();
            toast.error("Session Expired, Login Again!");
          }
        }
      }
    })();
  }, [loggedIn]);
};

export default useFetchUserCartAndWishlist;
