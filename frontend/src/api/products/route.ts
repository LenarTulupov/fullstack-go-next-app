// export async function fetchProducts() {
//   try {
//     const res = await fetch('https://backend-bbpq.onrender.com/products');

import { IProduct } from "@/types/product.interface";
import { products } from "@/utils/products";

//     if (!res.ok) {
//       throw new Error('Failed to fetch products' + res.statusText);
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error in fetchProducts:", error);
//     throw error;
//   }
// }
export function fetchProducts() {
  return products;
}
