'use client'

import Container from "@/components/ui/container/container";
import styles from './page.module.scss'
import Card from "@/components/card/card";
import { useSearchBarValue } from "@/hooks/useSearchBarValue";
import useProducts from "@/utils/useProducts";
import { IProduct } from "@/types/product.interface";
import ProductsGrid from "@/components/ui/products-grid/products-grid";

export default function Search() {
  const searchBarValue = useSearchBarValue();

  const { products } = useProducts();

  const filteredProducts = products.filter((product: IProduct) => {
    const searchTerms = searchBarValue
      .toLowerCase()
      .split(' ')
      .filter(term => term);

    return searchTerms.every((term) => {
      return (
        product.title.toLowerCase().includes(term)
      )
    });
  });
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
