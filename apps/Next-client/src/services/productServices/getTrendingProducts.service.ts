const getTrendingProductService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/trending`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export default getTrendingProductService;
