"use client";
import { IconButton } from "@mui/material";
import useLogOut from "../hooks/useLogOut";
import { useRouter } from "next/navigation";
import useWishlistStore from "../store/wishlist.store";
import addToWishlistService from "../services/wishlistServices/addToWishlist.service";
import removeFromWishlistService from "../services/wishlistServices/removeFromWishlist.service";
import { toast } from "sonner";
import { productType } from "common";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useAuth from "../utils/auth";

const WishlistButton = ({ product }: { product: productType }) => {
  const loggedIn = useAuth();
  const logOut = useLogOut();
  const router = useRouter();

  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlistContext = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlistContext = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const addToWishlist = async (product: any, ProductId: any) => {
    addToWishlistContext(product);
    const response = await addToWishlistService(ProductId);
    if (response.status === 201) {
      toast.success(response.data.message);
    } else if (response.status === 401) {
      await logOut();
      toast.error("Session Expired, Login Again!");
    } else {
      removeFromWishlistContext(ProductId);
      toast.error(response?.message ? response.message : response.data.message);
    }
  };

  const removeFromWishlist = async (product: any, ProductId: any) => {
    removeFromWishlistContext(ProductId);
    const response = await removeFromWishlistService(ProductId);
    if (response.status === 201) {
      toast.success(response.data.message);
    } else if (response.status === 401) {
      await logOut();
      toast.error("Session Expired, Login Again!");
    } else {
      addToWishlistContext(product);
      toast.error(response?.message ? response.message : response.data.message);
    }
  };

  const contains = wishlist.some((item) => {
    return JSON.stringify(product) === JSON.stringify(item);
  });

  return (
    <>
      {contains ? (
        <IconButton
          size="large"
          aria-label="show wishlist"
          color="inherit"
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={() =>
            loggedIn
              ? removeFromWishlist(product, product._id)
              : router.push("/login")
          }
        >
          <FavoriteIcon color="error" />
        </IconButton>
      ) : (
        <IconButton
          size="large"
          aria-label="show wishlist"
          color="inherit"
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={() =>
            loggedIn
              ? addToWishlist(product, product._id)
              : router.push("/login")
          }
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </>
  );
};

export default WishlistButton;
