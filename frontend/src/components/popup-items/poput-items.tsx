import { ISize } from '@/types/sizes.interface'
import Button from '../ui/button/button'
import Title from '../ui/title/title'
import styles from './popup-items.module.scss'
import CloseButton from '../ui/close-button/close-button';

interface IPopupItems {
  items: ISize[];
  isAddToCartClick: boolean;
  handleAddToCartClick: () => void;
}

export default function PopupItems({
  items, handleAddToCartClick, isAddToCartClick }: IPopupItems) {
  return (
    <div className={`
      ${styles['popup-items']} 
      ${isAddToCartClick ? styles.open : ''}
    `}>
      <div className={styles['popup-items__content']}>
        <div className={styles['flex-col']}>
          <Title weight='bold'>
            Choose the size
          </Title>
          <CloseButton onClick={handleAddToCartClick} />
        </div>
        <div className={styles['items-wrapper']}>
          {items.map((item) => {
            return (
              <Button
                key={item.id}
                onClick={handleAddToCartClick}
                disabled={!item.available}
              >
                {item.abbreviation}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
};
