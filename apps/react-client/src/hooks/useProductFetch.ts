import { useEffect } from "react";
import useProductStore from "../store/productListing.store";
import useCategoryStore from "../store/category.store";
import getAllProductService from "../services/productServices/getAllProducts.service";
import getAllCategoriesService from "../services/categoryServices/getAllCategories.service";
import { toast } from "sonner";

const useFetchAllProducts = () => {
  const setAllProducts = useProductStore((state) => state.setAllProducts);
  const setProducts = useProductStore((state) => state.setProducts);

  const setCategories = useCategoryStore((state) => state.setCategories);

  useEffect(() => {
    (async () => {
      //Getting All Products
      const productResponse = await getAllProductService();

      if (productResponse.status === 200) {
        setAllProducts(productResponse.data.products);
        setProducts(productResponse.data.products);
      } else {
        toast.error(productResponse.data.message);
      }

      //Getting ALl Categories
      const categoryResponse = await getAllCategoriesService();

      if (categoryResponse.status === 200) {
        setCategories(categoryResponse.data.category);
      } else {
        toast.error("Something Went Wrong");
      }
    })();
  }, []);
};

export default useFetchAllProducts;
