'use client'

import Container from "@/components/ui/container/container";
import styles from './page.module.scss'
import Card from "@/components/card/card";
import ProductsGrid from "@/components/ui/products-grid/products-grid";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Search() {
  const filteredProducts = useSelector(
    (state: RootState) => state.searchProducts.filteredProducts
  );
  return (
    <div className={styles.search}>
      <Container>
        <ProductsGrid>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
            // handleFavorite={() => handleAddToFavorite(product)}
            // onClick={() => handleSelectedProduct(product)}
            // handleAddedToCart={handleAddedToCart}
            />
          ))}
        </ProductsGrid>
      </Container>
    </div>
  )
};
