'use client'

import { ReactNode, useState, useEffect } from "react";
import { IProduct } from "@/types/product.interface";
import { filterItems, optionsList } from "@/constants/filter-items";
import Container from "@/components/ui/container/container";
import useProducts from "@/utils/useProducts";
import Popup from "@/components/ui/popup/popup";
import ProductContent from "@/components/product-content/product-content";
import SizeChartContent from "@/components/size-chart-content/size-chart-content";
import PopupItemsContent from "@/components/popup-items/poput-items-content";
import useProductPopup from "@/hooks/useProductPopup";
import Dropdown from "@/components/ui/dropdown/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setSelectedSortOption } from "@/store/selectedSortOption/selectedSortOptionSlice";
import { resetAllFilters } from "@/store/resetFilter/resetFilterSlice";
import styles from './layout.module.scss'

export default function LayoutCategory({ children }: { children: ReactNode }) {
  const { products } = useProducts();
  const { isProductPopupOpened } = useProductPopup();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isSizeChartPopupOpened, setIsSizeChartPopupOpened] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isSortOpened, setIsSortOpened] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const selectedSortOption = useSelector((state: RootState) =>
    state.selectedSortOption.selectedSortOption);
  const selectedPrice = useSelector((state: RootState) =>
    state.priceFilter.selectedPrice);
  const selectedSizes = useSelector((state: RootState) =>
    state.sizeFilter.selectedSizes);
  const selectedColors = useSelector((state: RootState) =>
    state.colorFilter.selectedColors);

  const handleResetFilters = () => {
    dispatch(resetAllFilters());
    setFiltersApplied(false);
  };

  const handleSelectedProduct = (product: IProduct) => {
    setSelectedProduct(product);
  };

  const handleSizeChartPopup = () => {
    setIsSizeChartPopupOpened(p => !p);
  };

  const handleAddedToCart = () => {
    setIsAddedToCart(p => !p);
  };

  const handleSort = () => {
    setActiveItem(null);
    setIsSortOpened((prev) => !prev);
  };

  const handleSortOptionClick = (option: string) => {
    dispatch(setSelectedSortOption(option));
    setIsSortOpened(false);
  };

  const handleItemClick = (item: string) => {
    setIsSortOpened(false);
    setActiveItem((prev) => (prev === item ? null : item));
  };

  useEffect(() => {
    const isFiltered =
      selectedSortOption !== "recommend" ||
      (activeItem !== null && (selectedSizes.length > 0 || selectedColors.length > 0 || selectedPrice !== null));
    setFiltersApplied(isFiltered);
  }, [selectedSortOption, activeItem, selectedSizes, selectedColors, selectedPrice]);

  return (
    <div className={styles['layout-category']}>
      <div className={styles['layout-category__wrapper']}>
        <Container>
          <div className={styles['layout-category__list']}>
            <div className={`
              ${styles['layout-category__list-center']} 
              ${styles['list-center']}
            `}>
              {filterItems.map((item) => {
                const itemWithFirstUpperLetter =
                  item.at(0)?.toUpperCase() + item.slice(1);
                return (
                  <button
                    key={item}
                    className={styles['list-center__item']}
                    onClick={() => handleItemClick(item)}
                  >
                    {itemWithFirstUpperLetter}
                  </button>
                );
              })}
              {filtersApplied && (
                <button
                  className={styles['list-center__item-reset']}
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
              )}
            </div>
            <div className={`
              ${styles['layout-category__list-end']} 
              ${styles['list-end']}
            `}>
              <label
                htmlFor="sort"
                onClick={handleSort}
                className={styles['list-end__label']}
              >
                Sort
              </label>
              {isSortOpened && (
                <div className={styles['list-end__select']}>
                  {optionsList.map((option) => (
                    <div
                      key={option}
                      className={`
                        ${styles['list-end__option']} 
                        ${selectedSortOption === option
                          ? styles['selected']
                          : ''}
                      `}
                      onClick={() => handleSortOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className={styles['layout-category__selected-items']}>
          {activeItem && <Dropdown item={activeItem} />}
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
  );
};
