'use client'

import FilterProductCategory from "@/components/filter-product-category/filter-product-category";
import { IProduct } from "@/types/product.interface";

export default function Bikinis() {
  const bikinisProducts = (product: IProduct) =>
    product.subcategory === 'bikinis'
  ;
  return <FilterProductCategory filterFunction={bikinisProducts} />
};
