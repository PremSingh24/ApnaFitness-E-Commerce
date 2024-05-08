import useLoginStore from "../store/login.store";
import useCartStore from "../store/cart.store";
import useWishlistStore from "../store/wishlist.store";
import logOutService from "../services/authServices/logOut.service";

const useLogOut = () => {
  const setLogOut = useLoginStore((state) => state.setLogOut);
  const setWishlist = useWishlistStore((state) => state.setWishlist);
  const setCart = useCartStore((state) => state.setCart);

  const logOut = async () => {
    await logOutService();
    document.cookie = `loggedIn=true; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem("loggedIn");
    setLogOut();
    setCart([]);
    setWishlist([]);
  };

  return logOut;
};

export default useLogOut;
