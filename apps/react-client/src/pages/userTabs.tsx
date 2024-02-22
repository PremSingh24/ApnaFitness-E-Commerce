import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Outlet, useNavigate } from "react-router-dom";

const UserTabs = () => {
  const [_value, setValue] = React.useState(window.location.pathname);
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          marginTop: { xs: "7rem", sm: "7rem", md: "5rem" },
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
        }}
      >
        <Tabs
          value={
            window.location.pathname === "/user"
              ? "/user/profile"
              : window.location.pathname
          }
          onChange={handleChange}
          centered
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ display: "flex" }}
        >
          <Tab
            label="Profile"
            onClick={() => {
              navigate("profile");
            }}
            sx={{ fontSize: "1rem" }}
            value={"/user/profile"}
          />
          <Tab
            label="Address"
            onClick={() => {
              navigate("address");
            }}
            sx={{ fontSize: "1rem" }}
            value={"/user/address"}
          />
          <Tab
            label="Orders"
            onClick={() => {
              navigate("myorders");
            }}
            sx={{ fontSize: "1rem" }}
            value={"/user/myorders"}
          />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};

export default UserTabs;
