import Image from 'next/image';
import CloseButton from '@/components/ui/close-button/close-button';
import Button from '@/components/ui/button/button';
import Price from '@/components/ui/price/price';
import colors from '@/app/colors.module.scss'
import styles from './cart-card.module.scss';
import Link from 'next/link';
import { IProduct } from '@/types/product.interface';
import { removeFromCart } from '@/store/cart/cart-slice';
import { useDispatch } from 'react-redux';
import { ISize } from '@/types/sizes.interface';

interface ICartCard {
  product: {
    quantity: number;
    size: ISize;
    product: IProduct;
  }
  isCartPage?: boolean;
}

export default function CartCard({ product, isCartPage }: ICartCard) {
  const dispatch = useDispatch();
  const selectedColor = colors[`color-${product.product.color}`];

  if (!selectedColor) {
    console.log(`Color "${product.product.color}" is not defined in styles.`);
    return null;
  }

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ product: product.product, size: product.size }))
  }

  return (
    <div className={`${styles['cart-card']} ${isCartPage ? styles['cart-card_sidebar'] : ''}`}>
      <Link
        href={`/product/${product.product.id}`}
        className={styles['cart-card__link-image']}
      >
        <Image
          src={product.product.images[0].image_url}
          alt={product.product.title}
          width={120}
          height={180}
        />
      </Link>
      <div className={styles['cart-card__content']}>
        <div className={styles['cart-card__title-wrapper']}>
          <Link href={`/product/${product.product.id}`}>
            <div>{product.product.title}</div>
          </Link>
          <CloseButton onClick={handleRemoveFromCart} />
        </div>
        <div className={`
          ${styles['cart-card__product-info']} 
          ${styles['product-info']}
          `}>
          <div className={`
            ${styles['product-info__color']} 
            ${selectedColor}`}
          />
          <div className={styles['product-info__size']}>
            {product.size.name}
          </div>
          <div className={styles['product-info__quantity']}>
            <div className={styles['product-info__quantity-text']}>
              QTY:
            </div>
            <span>{product.quantity}</span>
          </div>
        </div>
        <div className={styles['cart-card__prices']}>
          <Button>Edit</Button>
          <Price
            old
            className={styles['cart-card__prices-old']}
            price={product.product.price_old} />
          <Price
            className={styles['cart-card__prices-new']}
            price={product.product.price_new} />
        </div>
      </div>
    </div>
  )
};
