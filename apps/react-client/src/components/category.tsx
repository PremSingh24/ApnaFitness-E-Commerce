"use client";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";
import useCategoryStore from "../store/category.store";
import CategorySkeleton from "./categorySkeleton";

const skeletonArray = [0, 1, 2, 3];
const Categories = () => {
  const categories = useCategoryStore((state) => state.categories);

  const router = useRouter();

  return (
    <Container maxWidth="xl" sx={{ width: "100%", padding: 0 }}>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {categories.length > 0
          ? categories.map((category) => (
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={category._id}>
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
                  <CardActionArea
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                    onClick={() => {
                      router.push(
                        `/products/category/${category.name}/${category._id}`
                      );
                    }}
                  >
                    <CardMedia
                      component="img"
                      width={"100"}
                      image={category.image}
                      alt={category.name}
                      sx={{
                        objectFit: "contain",
                        aspectRatio: "3/2",
                        height: { xs: "50px", sm: "100px" },
                      }}
                    />

                    <CardContent>
                      <Typography
                        gutterBottom
                        sx={{
                          objectFit: "contain",
                          fontSize: {
                            xs: "0.8rem",
                            sm: "1.2rem",
                            md: "1.6rem",
                          },
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {category.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          : skeletonArray.map((i) => <CategorySkeleton key={i.toString()} />)}
      </Grid>
    </Container>
  );
};

export default Categories;
