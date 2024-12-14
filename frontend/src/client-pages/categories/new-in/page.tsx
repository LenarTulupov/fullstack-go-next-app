'use client'

import FilterProductCategory from "@/components/filter-product-category/filter-product-category";
import { IProduct } from "@/types/product.interface";

export default function NewIn() {
  const newProducts = (product: IProduct) =>
    Boolean(product.created_at);

  return (
    <FilterProductCategory
      filterFunction={newProducts}
      sortFunction={(a: IProduct, b: IProduct) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    />
  );
}
