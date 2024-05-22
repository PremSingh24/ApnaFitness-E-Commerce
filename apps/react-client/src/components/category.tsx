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
import useCategoryStore from "../store/category.store";
import getCategoryProductService from "../services/categoryServices/getCategoryProduct.service";
import useProductStore from "../store/productListing.store";
import Loader from "./loader";
import { useRouter } from "next/navigation";

const Categories = () => {
  const categories = useCategoryStore((state) => state.categories);
  const setProducts = useProductStore((state) => state.setProducts);

  const router = useRouter();

  const getOneCategoryProducts = async (categoryId: any) => {
    const response = await getCategoryProductService(categoryId);
    setProducts(response.products);

    router.push("/AllProducts");
  };

  return (
    <Container maxWidth="xl" sx={{ width: "100%", padding: 0 }}>
      {categories.length > 0 ? (
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {categories.map((category) => (
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
                    getOneCategoryProducts(category._id);
                  }}
                >
                  <CardMedia
                    component="img"
                    // height={"100"}
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
                        fontSize: { xs: "0.8rem", sm: "1.2rem", md: "1.6rem" },
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
          ))}
        </Grid>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Categories;
