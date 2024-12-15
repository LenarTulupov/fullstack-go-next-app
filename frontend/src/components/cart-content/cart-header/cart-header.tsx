import CloseButton from "@/components/ui/close-button/close-button";
import styles from './cart-header.module.scss';
import Title from "@/components/ui/title/title";
import useCart from "@/hooks/useCart";

export default function CartHeader() {
  const { handleCartSidebarToggle } = useCart();
  return (
    <header className={styles['cart-header']}>
      <Title weight="bold">your cart</Title>
      <CloseButton onClick={handleCartSidebarToggle} />
    </header>
  )
};
