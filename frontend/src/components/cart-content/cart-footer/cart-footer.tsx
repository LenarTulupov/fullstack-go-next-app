import Title from '@/components/ui/title/title';
import styles from './cart-footer.module.scss';
import Button from '@/components/ui/button/button';
import Link from 'next/link';
import CartService from '@/services/cart.service';
import Price from '@/components/ui/price/price';
import useCart from '@/hooks/useCart';

export default function CartFooter() {
  const { totalPrice, discount } = CartService();
  const { handleCartSidebarToggle } = useCart();
  return (
    <div className={styles['cart-footer']}>
      <div className={styles['cart-footer__discount']}>
        <Title weight='bold'>Discount</Title>
        <Price price={discount}/>
      </div>
      <div className={styles['cart-footer__subtotal']}>
        <div>
          <Title weight='bold'>Subtotal (excluding delivery)</Title>
          <Title>*All taxes are included in product prices</Title>
        </div>
        <Price price={totalPrice}/>
      </div>
      <div className={styles['cart-footer__buttons']}>
        <Link
          href='/cart'
          className={styles['cart-footer__buttons-link']}
          onClick={handleCartSidebarToggle}

        >
          View Cart
        </Link>
        <Button
          className={styles['cart-footer__buttons-button']}
          radius='none'
        >
          Checkout
        </Button>
      </div>
    </div>
  )
};
