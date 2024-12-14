'use client'

import FilterProductCategory from "@/components/filter-product-category/filter-product-category";
import { IProduct } from "@/types/product.interface"

export default function Summer() {
  const summerProducts = (product: IProduct) => 
    product.categories?.includes('summer')
  ;
  return <FilterProductCategory filterFunction={summerProducts}/>
};
