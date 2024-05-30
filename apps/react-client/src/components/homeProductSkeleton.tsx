import { Card, CardActions, Grid, Skeleton } from "@mui/material";

const HomeProductSkeleton = () => {
  return (
    <Grid
      item
      xs={6}
      sm={3}
      md={3}
      lg={3}
      xl={3}
      sx={{
        marginLeft: { xs: -0.6, sm: 0, lg: 3.5 },
        marginRight: { xs: 0.5, sm: 0, lg: -3.5 },
      }}
    >
      <Card
        sx={{
          height: { xs: 390, sm: 380, md: 460 },
          width: { xs: 183, sm: 180, md: 230, lg: 290 },
          padding: { xs: "0px", sm: "10px" },
          marginBottom: "20px",
          position: "relative",
          ":hover": { boxShadow: "20" },
        }}
      >
        <Skeleton
          variant="rectangular"
          width={"100%"}
          sx={{ height: { xs: 150, sm: 120, md: 200 } }}
        />
        <Skeleton width={"80%"} height={"10%"} />
        <Skeleton width={"80%"} height={"8%"} />
        <Skeleton width={"30%"} height={"7%"} />
        <Skeleton width={"50%"} height={"6%"} />
        <Skeleton width={"50%"} height={"6%"} />
        <CardActions
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingRight: 0,
            left: { xs: 5, md: "auto" },
          }}
        >
          <Skeleton width={"90%"} height={50} />
        </CardActions>
      </Card>
    </Grid>
  );
};

export default HomeProductSkeleton;
