'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { productsArray, setProducts } from "@/store/products/productsSlice";
import Container from "@/components/ui/container/container";
// import Pagination from "@/components/pagination/pagination";
import ProductsGrid from "@/components/ui/products-grid/products-grid";
import styles from './page.module.scss'
import Card from "@/components/card/card";

export default function Page() {
  const dispatch = useDispatch();
  const products = useSelector(productsArray);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://fullstack-go-next-app.onrender.com/products');

      if (res.ok) {
        const data = await res.json();
        dispatch(setProducts(data));
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
          {products.map((product) => {
            return (
              <Card
                key={product.id}
                id={product.id}
                title={product.title}
                src={product.images[0].image_url}
                alt={product.title}
                price_new={product.price_new}
                price_old={product.price_old}
                sizes={product.sizes}
              />
            )
          })}
        </ProductsGrid>
        {/* <Pagination products={products} /> */}
      </Container>
    </div>
  )
};
