'use client'

import FilterProductCategory from "@/components/filter-product-category/filter-product-category";
import { IProduct } from "@/types/product.interface"

export default function Trends() {
  const trendsProducts = (product: IProduct) =>
    product.categories?.includes('trends')
  ;
  return <FilterProductCategory filterFunction={trendsProducts}/>
};
