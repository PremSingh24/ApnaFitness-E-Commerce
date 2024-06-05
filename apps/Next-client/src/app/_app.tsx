"use client";

import useFetchAllProducts from "../hooks/useProductFetch";
import useFetchUserCartAndWishlist from "../hooks/useUserDataFetch";

export default function FetchAllData({
  children,
}: {
  children: React.ReactNode;
}) {
  useFetchAllProducts();
  useFetchUserCartAndWishlist();
  return children;
}
