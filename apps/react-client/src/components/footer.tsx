"use client";
import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      component="footer"
      style={{ marginTop: "auto", flex: "1" }}
      sx={{
        width: "100%",
        py: 3,
        px: 2,
        mt: "auto",
        mb: { xs: "3.5rem", sm: "auto" },
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#28282B" : theme.palette.grey[200],
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="white" fontSize={"1rem"}>
          {"Copyright © "}
          <Link href="/" style={{ textDecoration: "none", color: "#FFFFFF" }}>
            ApnaFitness
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
