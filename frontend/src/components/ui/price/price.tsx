import formatCurrency from '@/utils/formatCurrency';
import styles from './price.module.scss'

interface IPrice {
  price: string | number;
  className?: string;
  currency?: 'EUR' | 'USD';
  old?: boolean;
}

export default function Price({ 
  price, 
  className, 
  currency = 'EUR', 
  old = false }: IPrice) {
  return (
    <div className={`
      ${styles.price} ${old ? styles.old : ''} 
      ${className || ''}
    `}>
      {formatCurrency(
        { price, currency }
      )}
    </div>
  )
};
