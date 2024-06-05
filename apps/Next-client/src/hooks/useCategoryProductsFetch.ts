"use client";
import { useEffect, useState } from "react";
import getCategoryProductService from "../services/categoryServices/getCategoryProduct.service";
import { toast } from "sonner";
import { productType } from "common";

const useCategoryProductsFetch = (categoryId: string) => {
  const [products, setProducts] = useState<productType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getCategoryProductService(categoryId);
      if (response.status == 200) {
        setProducts(response.data.products);
      } else {
        toast.error(
          response.message ? response.message : response.data.message
        );
      }
    })();
  }, []);
  return { products };
};
export default useCategoryProductsFetch;
