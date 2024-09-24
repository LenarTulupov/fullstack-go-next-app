'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { productsArray, setProducts } from "@/store/products/productsSlice";
import Container from "@/components/ui/container/container";
import Pagination from "@/components/pagination/pagination";
import ProductsGrid from "@/components/ui/products-grid/products-grid";
// import Card from "@/components/card/card";
import styles from './page.module.scss'

export default function Page() {
  const dispatch = useDispatch();
  const products = useSelector(productsArray);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products'); // Локальный маршрут в Next.js
  
      if (res.ok) {
        const data = await res.json();
        dispatch(setProducts(data)); // Диспатчим данные
      } else {
        console.error("Failed to fetch products");
      }
    }
  
    fetchProducts();
  }, [dispatch]);

  console.log(products)

  return (
    <div className={styles.all}>
      <Container>
        <ProductsGrid>
          {products.map((product) => (
            <div key={product.id}>
              {product.title}
            </div>
          ))
          }
          {/* {products.map((product) => {
            const imageUrl =
              product.product_colors[0].product_color_images[0].image_path;
              console.log(product.sizes);
            return (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                price_new={product.price_new}
                price_old={product.price_old}
                sizes={product.sizes}
                src={imageUrl}
                alt={product.title}
              />
            )
          })} */}
        </ProductsGrid>
        <Pagination products={products} />
      </Container>
    </div>
  )
};
