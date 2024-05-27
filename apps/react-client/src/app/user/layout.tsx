"use client";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const UserTabs = ({ children }: { children: React.ReactNode }) => {
  const [_currentPath, setCurrentPath] = useState(usePathname());
  const router = useRouter();

  const handleRouteChange = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    setCurrentPath(newValue);
  };

  return (
    <>
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
            value={usePathname()}
            onChange={handleRouteChange}
            centered
            textColor="secondary"
            indicatorColor="secondary"
            sx={{ display: "flex" }}
          >
            <Tab
              label="Profile"
              onClick={() => {
                router.push("/user/profile");
              }}
              sx={{ fontSize: "1rem" }}
              value={"/user/profile"}
            />
            <Tab
              label="Address"
              onClick={() => {
                router.push("/user/address");
              }}
              sx={{ fontSize: "1rem" }}
              value={"/user/address"}
            />
            <Tab
              label="Orders"
              onClick={() => {
                router.push("/user/orders");
              }}
              sx={{ fontSize: "1rem" }}
              value={"/user/orders"}
            />
          </Tabs>
        </Box>
      </Box>
      {children}
    </>
  );
};

export default UserTabs;
