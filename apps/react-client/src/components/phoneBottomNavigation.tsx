"use client";
import { Badge, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import useWishlistStore from "../store/wishlist.store";
import { useRouter } from "next/navigation";

const PhoneBottomNavigation = () => {
  const [value, setValue] = useState(window.location.pathname);
  const router = useRouter();

  const wishlist = useWishlistStore((state) => state.wishlist);

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        display: { xs: "flex", sm: "none" },
      }}
      value={
        window.location.pathname.includes("/user")
          ? value
          : window.location.pathname
      }
      onChange={(_event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="home"
        icon={<HomeIcon />}
        onClick={() => {
          router.push("/");
        }}
        value={"/"}
      />

      <BottomNavigationAction
        label="wishlist"
        icon={
          <Badge
            badgeContent={wishlist.length > 0 ? wishlist.length : null}
            max={9}
            color="error"
          >
            <FavoriteIcon />
          </Badge>
        }
        onClick={() => {
          router.push("/mywishlist");
        }}
        value={"/mywishlist"}
      />

      <BottomNavigationAction
        label="profile"
        icon={<PersonIcon />}
        onClick={() => {
          router.push("/user");
        }}
        value={"/user"}
      />
    </BottomNavigation>
  );
};

export default PhoneBottomNavigation;
