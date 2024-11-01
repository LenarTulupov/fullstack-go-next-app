import Image from 'next/image';
import CloseButton from '@/components/ui/close-button/close-button';
import Button from '@/components/ui/button/button';
import Price from '@/components/ui/price/price';
import colors from '@/app/colors.module.scss'
import styles from './cart-card.module.scss';
import Link from 'next/link';
import { IProduct } from '@/types/product.interface';

interface ICartCard {
  product: {
    quantity: number;
    size: {
      name?: string;
    }
    product: IProduct
  }
}

export default function CartCard({ product }: ICartCard) {
  const selectedColor = colors[`color-${product.product.color}`];

  if (!selectedColor) {
    console.warn(`Color "${product.product.color}" is not defined in styles.`);
    return null;
  }
  return (
    <div className={styles['cart-card']}>
      <Link href={`/product/${product.product.id}`}>
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
          <CloseButton />
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
