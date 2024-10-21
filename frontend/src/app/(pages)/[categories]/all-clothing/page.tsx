'use client';

import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite, selectFavoriteProducts } from "@/store/favorite-button/favoriteButtonSlice";
import { IProduct } from "@/types/product.interface";
import Container from "@/components/ui/container/container";
import ProductsGrid from "@/components/ui/products-grid/products-grid";
import Card from "@/components/card/card";
import Popup from "@/components/ui/popup/popup";
import ProductContent from "@/components/product-content/product-content";
import useProductPopup from "@/hooks/useProductPopup";
import SizeChartContent from "@/components/size-chart-content/size-chart-content";
import PopupItemsContent from "@/components/popup-items/poput-items-content";
import CardSkeleton from "@/components/ui/card-skeleton/card-skeleton";
import styles from './page.module.scss'
import { AppDispatch } from "@/store/store";
import useProducts from "@/utils/useProducts";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteProducts = useSelector(selectFavoriteProducts);
  const { isProductPopupOpened } = useProductPopup();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isSizeChartPopupOpened, setIsSizeChartPopupOpened] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const { products, error, isLoading } = useProducts();

  if (error) return <div>Error fetching products</div>;

  const handleAddedToCart = () => {
    setIsAddedToCart(p => !p);
  }

  const handleSizeChartPopup = () => {
    setIsSizeChartPopupOpened(p => !p);
  }

  const handleSelectedProduct = (product: IProduct) => {
    setSelectedProduct(product);
  }

  const handleAddToFavorite = (product: IProduct) => {
    const isFavorite = favoriteProducts
      .some(favProduct => favProduct.id === product.id);

    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  return (
    <div className={styles.all}>
      <Container>
        <ProductsGrid>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={index} />
            )) // Пока идет загрузка, отображаем скелетоны
            : products.map((product) => {
              const isFavorite = favoriteProducts.some(
                favProduct => favProduct.id === product.id
              );
              return (
                <Card
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  images={product.images}
                  alt={product.title}
                  price_new={product.price_new}
                  price_old={product.price_old}
                  sizes={product.sizes}
                  color={product.color}
                  handleFavorite={() => handleAddToFavorite(product)}
                  description={product.description}
                  onClick={() => handleSelectedProduct(product)}
                  handleAddedToCart={handleAddedToCart}
                />
              );
            })}
        </ProductsGrid>
        {selectedProduct && (
          <Popup isPopupOpened={isProductPopupOpened} nested>
            <ProductContent
              product={selectedProduct}
              handleSizeChartPopup={handleSizeChartPopup}
            />
          </Popup>
        )}
        {selectedProduct && (
          <Popup nested isPopupOpened={isSizeChartPopupOpened}>
            <SizeChartContent
              handleSizeChart={handleSizeChartPopup} />
          </Popup>
        )}
        {isAddedToCart && selectedProduct && (
          <Popup isPopupOpened={isAddedToCart} nested>
            <PopupItemsContent
              items={selectedProduct.sizes}
              handleAddToCartClick={handleAddedToCart}
            />
          </Popup>
        )}
      </Container>
    </div>
  )
};