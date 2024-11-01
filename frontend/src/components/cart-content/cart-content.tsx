'use client'

import CartHeader from './cart-header/cart-header';
import CartFooter from './cart-footer/cart-footer';
import CartPromoSubfooter from './cart-promo-subfooter/cart-promo-subfooter';
import CartCard from './cart-card/cart-card';
import { useSelector } from 'react-redux';
import { selectCart } from '@/store/cart/cartSlice';
import styles from './cart-content.module.scss';
import Divider from '../ui/divider/divider';

export default function CartContent() {
  const cart = useSelector(selectCart);
  console.log(cart)
  return (
    <div className={styles['cart-content']}>
      <CartHeader />
      <div className={styles['cart-content__cards-wrapper']}>
        {cart.map((item) => (
          <CartCard
            key={item.product.id}
            product={item}
          />
        ))}
      </div>
      {/* <Divider/> */}
      <CartFooter />
      <CartPromoSubfooter />
    </div>
  )
};
