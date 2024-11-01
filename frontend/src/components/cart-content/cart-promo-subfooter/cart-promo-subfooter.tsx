import Image from 'next/image';
import styles from './cart-promo-subfooter.module.scss';
import Link from 'next/link';


export default function CartPromoSubfooter() {
  const subfooterPromo = '/promo-subfooter/promo-subfooter.webp'
  return (
    <div className={styles['cart-promo-subfooter']}>
      <Link href='/categories/trends'>
        <Image
          src={subfooterPromo}
          alt='promo image'
          width={0}
          height={0}
          layout='responsive'
        />
      </Link>
    </div>
  )
};
