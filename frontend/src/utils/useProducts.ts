import { fetchProducts } from "@/api/products/route";
import { setProducts } from "@/store/products/productsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IProduct } from "@/types/product.interface";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function useProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const { data, error, isLoading } = useQuery<IProduct[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 7 * 24 * 60 * 60 * 1000,
    gcTime: 14 * 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    console.log("Loading products...");
  }

  if (error) {
    console.error("Error fetching products:", error);
  }

  return { products, isLoading, error, data };
}
