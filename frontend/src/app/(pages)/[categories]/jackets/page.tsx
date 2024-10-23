'use client'

import FilterProductCategory from "@/components/filter-product-category/filter-product-category";
import { IProduct } from "@/types/product.interface"

export default function Jackets() {
  const jacketsProducts = (product: IProduct) => 
    product.subcategory?.includes('jackets')
  ;

  return <FilterProductCategory filterFunction={jacketsProducts}/>
};
