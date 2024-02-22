import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", paddingTop: "10rem" }}
    >
      <CircularProgress
        size={"3rem"}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      />
    </Box>
  );
};

export default Loader;
