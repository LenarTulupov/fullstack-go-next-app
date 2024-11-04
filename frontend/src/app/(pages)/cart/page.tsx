'use client'

import CartContent from "@/components/cart-content/cart-content";
import Container from "@/components/ui/container/container";
import CartHeader from "./cart-header/cart-header";
import styles from './page.module.scss';
import EmptyMessage from "@/components/ui/empty-message/empty-message";
import { TbShoppingCartPlus } from "react-icons/tb";
import Divider from "@/components/ui/divider/divider";
import { useSelector } from "react-redux";
import { selectCart } from "@/store/cart/cartSlice";

export default function Cart() {
  const cart = useSelector(selectCart);
  return (
    <div className={styles.cart}>
      <Container>
        <CartHeader />
      </Container>
      <Divider />
      <Container>
        <div className={styles['cart__wrapper']}>
          {cart.length === 0 ? (
            <EmptyMessage
              message='Your cart is empty'
              icon={<TbShoppingCartPlus />}
            />
          ) : (
            <CartContent />
          )}
        </div>
      </Container>
      <Divider />
    </div>
  )
};
