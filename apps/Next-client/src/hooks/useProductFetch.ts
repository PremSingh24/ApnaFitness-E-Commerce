"use client";
import { useEffect } from "react";
import useProductStore from "../store/productListing.store";
import getAllProductService from "../services/productServices/getAllProducts.service";
import { toast } from "sonner";

const useFetchAllProducts = () => {
  const allProducts = useProductStore((state) => state.allProducts);
  const setAllProducts = useProductStore((state) => state.setAllProducts);

  useEffect(() => {
    (async () => {
      if (allProducts.length === 0) {
        //Getting All Products
        const productResponse = await getAllProductService();

        if (productResponse.status === 200) {
          setAllProducts(productResponse.data.products);
        } else {
          toast.error(
            productResponse?.message
              ? productResponse.message
              : productResponse.data.message
          );
        }
      }
    })();
  }, []);
};

export default useFetchAllProducts;
