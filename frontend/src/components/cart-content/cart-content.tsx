'use client'

import CartHeader from './cart-header/cart-header';
import CartFooter from './cart-footer/cart-footer';
import CartPromoSubfooter from './cart-promo-subfooter/cart-promo-subfooter';
import CartCard from './cart-card/cart-card';
import { useSelector } from 'react-redux';
import { selectCart } from '@/store/cart/cartSlice';
import styles from './cart-content.module.scss';
import EmptyMessage from '../ui/empty-message/empty-message';
import { usePathname } from 'next/navigation';
import CartIcon from '../ui/cart-icon/cart-icon';
import Sidebar from '../ui/sidebar/sidebar';
import useCart from '@/hooks/useCart';

interface ICartContent {
  isCartPage?: boolean;
}

export default function CartContent({ isCartPage = false }: ICartContent) {
  const cart = useSelector(selectCart);
  const pathname = usePathname();
  const { isCartSidebarOpened } = useCart();

  if (isCartPage) {
    pathname === '/cart'
  }

  return (
    <div className={styles['cart-content']}>
      {!isCartPage && <CartHeader />}
      {!isCartPage && cart.length === 0 ? (
        <EmptyMessage
          className={styles['empty-message']}
          message='Your cart is empty'
          icon={<CartIcon />}
        />
      ) : (
        <>
          <div className={styles['cart-content__cards-wrapper']}>
            {cart.map((item) => (
              <CartCard
                key={item.product.id}
                product={item}
                isCartPage={isCartPage}
              />
            ))}
          </div>
          {!isCartPage && <CartFooter />}
        </>
      )}
      {!isCartPage && <CartPromoSubfooter />}
      <Sidebar isCartSidebarOpened={isCartSidebarOpened}>
        <CartContent />
      </Sidebar>
    </div>
  )
};
