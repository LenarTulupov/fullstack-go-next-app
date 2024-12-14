'use client'

import CartService from "@/services/cart.service";
import styles from './cart-header.module.scss';

export default function CartHeader() {
  const { productsQuantity } = CartService();

  return (
    <div className={styles['cart-header']}>
        Cart({productsQuantity})
    </div>
  )
};
