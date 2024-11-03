import CartContent from "@/components/cart-content/cart-content";
import Container from "@/components/ui/container/container";
import CartHeader from "./cart-header/cart-header";
import styles from './page.module.scss';

export default function Cart() {
  return (
    <div className={styles.cart}>
      <Container>
        <CartHeader />
        <div className={styles['cart__wrapper']}>
          <CartContent />
        </div>
      </Container>
    </div>
  )
};
