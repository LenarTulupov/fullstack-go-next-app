import styles from './price.module.scss'

interface IPrice {
  price: string;
  className?: string;
}

export default function Price({ price, className }: IPrice ) {
  return (
    <div className={`${styles.price} ${className || ''}`}>
        { price }
    </div>
  )
};
