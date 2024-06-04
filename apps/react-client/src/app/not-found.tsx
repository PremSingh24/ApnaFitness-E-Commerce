"use client";
import { Box, Button, Container, Typography, styled } from "@mui/material";
import errorImage from "../../src/assets/errorImage.webp";
import { useRouter } from "next/navigation";
const Image = styled("img")`
  width: 380px;
  object-fit: contain;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  mix-blend-mode: multiply;

  @media (min-width: 600px) {
    width: 100%;
    height: 650px;
    grid-area: 1/1/3/2;
  }
`;

const ErrorPage = () => {
  const router = useRouter();
  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: { xs: "10rem", sm: "auto" },
        marginLeft: 0,
        paddingLeft: { xs: 0 },
        paddingRight: { xs: 0 },
        height: { xs: "100%", sm: "100vh" },
        minWidth: "100vw",
        display: "grid",
        gridTemplateColumns: { xs: "none", sm: "repeat(2,1fr)" },
      }}
    >
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", sm: "start" },
          height: "0px",
        }}
      >
        <Typography
          fontWeight={"bold"}
          sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        >
          OOPS!
        </Typography>
        <Typography
          fontWeight={"bold"}
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          404 PAGE NOT FOUND
        </Typography>
      </Box>

      <Image src={errorImage.src} height={100} width={100} alt="Error" />

      <Box sx={{ marginTop: { xs: "0", sm: "6rem" } }}>
        <Typography
          sx={{
            marginBottom: 4,
            fontSize: { xs: "1rem", md: "1.4rem" },
            width: { sm: "90%" },
            marginLeft: { xs: "1.5rem", sm: "0" },
            display: "flex",
            alignItems: { xs: "center", sm: "start" },
          }}
        >
          The page you're looking for might have been moved or deleted
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: { sm: "75%" },
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Button
            size="large"
            variant="contained"
            sx={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.6)",
              borderRadius: 5,
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            Go back to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorPage;
