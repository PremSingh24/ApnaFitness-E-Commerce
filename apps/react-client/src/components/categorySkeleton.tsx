import { Card, CardContent, Grid, Skeleton } from "@mui/material";

const CategorySkeleton = () => {
  return (
    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
      <Card
        sx={{
          maxHeight: { xs: "100px", sm: "200px", md: "200px" },
          width: { xs: "85px", sm: "auto" },
          padding: { xs: "5px", sm: "10px" },
          marginBottom: "20px",
          ":hover": { boxShadow: "10" },
          alignItems: "center",
          color: "black",
          backgroundColor: "#F0F0F0",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={"100"}
          sx={{ height: { xs: "50px", sm: "100px" } }}
        />

        <CardContent
          sx={{
            fontSize: {
              xs: "0.8rem",
              sm: "1.2rem",
              md: "1.6rem",
            },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Skeleton width={"90%"} height={"50"} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategorySkeleton;
