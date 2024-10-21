'use client'

import { ReactNode, useEffect } from "react";
import Container from "@/components/ui/container/container";
import styles from './layout.module.scss'
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setFilters } from "@/store/filters/filtersSlice";
import { optionsList } from "@/constants/filter-items";
import { layoutItems } from "@/constants/layout-items";
import useProducts from "@/utils/useProducts";

export default function LayoutCategory({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useProducts();

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
      </Container>
      {children}
    </div>
  )
};
