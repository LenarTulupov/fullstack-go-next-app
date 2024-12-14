'use client'

import FilterProductCategory from "@/components/filter-product-category/filter-product-category";
import { IProduct } from "@/types/product.interface"

export default function Dresses() {
  const dressesProducts = (product: IProduct) => 
    product.categories?.includes('dresses')
  ;
  return <FilterProductCategory filterFunction={dressesProducts}/>
};
