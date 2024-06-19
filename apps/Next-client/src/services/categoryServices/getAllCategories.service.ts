const getAllCategoriesService = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category/all`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data.category;
  } catch (error) {
    return { message: "Something Went Wrong" };
  }
};

export default getAllCategoriesService;
