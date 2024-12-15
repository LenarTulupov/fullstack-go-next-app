'use client'

import Card from "@/components/card/card";
import Container from "@/components/ui/container/container";
import ProductsGrid from "@/components/ui/products-grid/products-grid";
import { selectFavorites } from "@/store/favorites/favorites-slice";
import { IProduct } from "@/types/product.interface";
import { useSelector } from "react-redux";
import styles from './page.module.scss';
import Title from "@/components/ui/title/title";

export default function Favorite() {
  const favorites = useSelector(selectFavorites);
  return (
    <div className={styles.favorite}>
      <Container>
        {favorites.length === 0 ?
          <Title className={styles.favorite__title}>You haven&apos;t added products yet</Title>
          : (
            <ProductsGrid>
              {favorites.map((favorite: IProduct) => (
                <Card
                  key={favorite.id}
                  product={favorite}
                />
              ))}
            </ProductsGrid>
          )}
      </Container>
    </div>
  )
};
