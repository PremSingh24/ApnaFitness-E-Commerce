"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Outlet } from "react-router-dom";
import { useRouter } from "next/navigation";

const UserTabs = () => {
  const [_value, setValue] = React.useState(window.location.pathname);
  const router = useRouter();

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
              router.push("profile");
            }}
            sx={{ fontSize: "1rem" }}
            value={"/user/profile"}
          />
          <Tab
            label="Address"
            onClick={() => {
              router.push("address");
            }}
            sx={{ fontSize: "1rem" }}
            value={"/user/address"}
          />
          <Tab
            label="Orders"
            onClick={() => {
              router.push("myOrders");
            }}
            sx={{ fontSize: "1rem" }}
            value={"/user/myOrders"}
          />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};

export default UserTabs;
