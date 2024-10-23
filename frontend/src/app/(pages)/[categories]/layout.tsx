'use client'

import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IProduct } from "@/types/product.interface";
import { setFilters } from "@/store/filters/filtersSlice";
import { AppDispatch } from "@/store/store";
import { optionsList } from "@/constants/filter-items";
import { layoutItems } from "@/constants/layout-items";
import Container from "@/components/ui/container/container";
import useProducts from "@/utils/useProducts";
import Popup from "@/components/ui/popup/popup";
import ProductContent from "@/components/product-content/product-content";
import SizeChartContent from "@/components/size-chart-content/size-chart-content";
import PopupItemsContent from "@/components/popup-items/poput-items-content";
import useProductPopup from "@/hooks/useProductPopup";
import styles from './layout.module.scss'

export default function LayoutCategory({ children }: { children: ReactNode}) {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useProducts();
  const { isProductPopupOpened } = useProductPopup();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isSizeChartPopupOpened, setIsSizeChartPopupOpened] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);

  const handleSelectedProduct = (product: IProduct) => {
    setSelectedProduct(product);
  }

  const handleSizeChartPopup = () => {
    setIsSizeChartPopupOpened(p => !p);
  }

  const handleAddedToCart = () => {
    setIsAddedToCart(p => !p);
  }

  useEffect(() => {
    if (products.length) {
      dispatch(setFilters(products))
    }
  }, [dispatch, products]);

  return (
    <div className={styles['layout-category']}>
      <div className={styles['layout-category__wrapper']}>
        <Container>
          <div className={styles['layout-category__list']}>
            <div className={`
              ${styles['layout-category__list-center']} 
              ${styles['list-center']}
            `}>
              {layoutItems.map((item) => {
                const itemWithFirstUpperLetter =
                  item.at(0)?.toUpperCase() + item.slice(1);
                return (
                  <button key={item} className={styles['list-center__item']}>
                    {itemWithFirstUpperLetter}
                  </button>
                )
              })}
            </div>
            <div className={`
              ${styles['layout-category__list-end']} 
              ${styles['list-end']}
            `}>
              <select name="" id="" className={styles['list-end__select']}>
                Sort
                {optionsList.map((option) => (
                  <option
                    key={option}
                    value=""
                    className={styles['list-end__option']}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className={styles['layout-category__selected-items']}>

        </div>
        {children}
      </Container>
      {selectedProduct && (
        <Popup isPopupOpened={isProductPopupOpened} nested>
          <ProductContent
            product={selectedProduct}
            handleSizeChartPopup={handleSizeChartPopup}
            closeButton
          />
        </Popup>
      )}

      {selectedProduct && (
        <Popup nested isPopupOpened={isSizeChartPopupOpened}>
          <SizeChartContent handleSizeChart={handleSizeChartPopup} />
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
    </div>
  )
};
