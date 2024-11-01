import Title from '@/components/ui/title/title';
import styles from './cart-footer.module.scss';
import Button from '@/components/ui/button/button';
import Link from 'next/link';

export default function CartFooter() {
  return (
    <div className={styles['cart-footer']}>
      <div className={styles['cart-footer__discount']}>
        <Title weight='bold'>Discount</Title>
        <Title weight='bold'>-£22.00</Title>
      </div>
      <div className={styles['cart-footer__subtotal']}>
        <div>
          <Title weight='bold'>Subtotal (excluding delivery)</Title>
          <Title>*All taxes are included in product prices</Title>
        </div>
        <Title weight='bold'>£34.00</Title>
      </div>
      <div className={styles['cart-footer__buttons']}>
        <Link
          href='/cart'
          className={styles['cart-footer__buttons-link']}

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
