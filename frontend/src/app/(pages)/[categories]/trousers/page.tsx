'use client'

import FilterProductCategory from "@/components/filter-product-category/filter-product-category";
import { IProduct } from "@/types/product.interface"

export default function Trousers() {
  const trousersProducts = (product: IProduct) => 
    product.subcategory?.includes('trousers')
  ;
  return <FilterProductCategory filterFunction={trousersProducts}/>
};
