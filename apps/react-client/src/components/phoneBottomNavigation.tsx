import { Badge, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWishlistStore from "../store/wishlist.store";

const PhoneBottomNavigation = () => {
  const [value, setValue] = useState(window.location.pathname);
  const navigate = useNavigate();

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
          navigate("/");
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
          navigate("/mywishlist");
        }}
        value={"/mywishlist"}
      />

      <BottomNavigationAction
        label="profile"
        icon={<PersonIcon />}
        onClick={() => {
          navigate("/user");
        }}
        value={"/user"}
      />
    </BottomNavigation>
  );
};

export default PhoneBottomNavigation;
