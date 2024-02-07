import { productType } from "common";


  //Filtering data according to rating
    const rateData = (data:productType[], rating:number) => {
      if(rating === null) return data;
      return data.filter((p) => p.rating >= rating);
    };

    //Filtering Products According to a PriceRange
    const filterProductsUptoPriceRange = (data:productType[], priceRange:number[]) => {
      return data.filter((product:any) => product.currentPrice >= priceRange[0] && product.currentPrice <= priceRange[1]);
    };

    //Sort According to Price
    const sortData = (data:productType[], sortBy:string) => {
    
        if (sortBy === "high") {
        return [...data].sort((a, b) => b.currentPrice - a.currentPrice);
        }
    
        if (sortBy === "low") {
        return [...data].sort((a, b) => a.currentPrice - b.currentPrice);
        }

        return data;
    
    };
  
    
  
    const getOnlyFastDeliveryData = (data:productType[], fastDeliveryOnly:boolean) => {
        return fastDeliveryOnly ? data.filter((p) => p.isDeliveredFast) : data;
    };
  
    const getStockData = (data:productType[], removeOutOfStock:boolean) => {
        return removeOutOfStock ? data.filter((p) => p.inStock) : data;
    };
  
    type filterState = {
      sortBy:string,
      priceRange:number[],
      rating:number,
      removeOutOfStock:boolean,
      fastDeliveryOnly:boolean,
    }
  
  const getFilteredProducts = (productData:productType[], filterState:filterState) => {
    

    const {
      sortBy,
      priceRange,
      rating,
      removeOutOfStock,
      fastDeliveryOnly,
    } = filterState;
  
    
  
    const ratedData = rateData(productData, rating);
  
    const getPriceRangedData = filterProductsUptoPriceRange(
      ratedData,
      priceRange
    );
  
    const fastDeliveredData = getOnlyFastDeliveryData(
      getPriceRangedData,
      fastDeliveryOnly
    );
    const stockedData = getStockData(fastDeliveredData, removeOutOfStock);
  
    const sortedData = sortData(stockedData, sortBy);
  
     return sortedData;
  };
  
  export { getFilteredProducts };
  // export {
  //   rateData,
  //   filterProductsUptoPriceRange,
  //   getOnlyFastDeliveryData,
  //   getStockData,
  //   sortData
  // };