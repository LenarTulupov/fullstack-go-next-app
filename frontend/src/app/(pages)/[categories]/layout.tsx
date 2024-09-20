'use client'

import { ReactNode, useEffect } from "react";
import Container from "@/components/ui/container/container";
import styles from './layout.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {  setFilters } from "@/store/filters/filtersSlice";
import { productsArray } from "@/store/products/productsSlice";
import { optionsList } from "@/constants/filter-items";
import Button from "@/components/ui/button/button";
import { layoutItems } from "@/constants/layout-items";

export default function LayoutCategory({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(productsArray);

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
            <div className={styles['layout-category__list-center']}>
              {layoutItems.map((item) => (
                <Button key={item}>
                  {item}
                </Button>
              ))}
            </div>
            <div className={styles['layout-category__list-end']}>
              <select name="" id="">
                Sort
                {optionsList.map((option) => (
                  <option key={option} value="">{option}</option>
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
