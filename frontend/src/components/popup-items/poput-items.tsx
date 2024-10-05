import { ISize } from '@/types/sizes.interface'
import Button from '../ui/button/button'
import Title from '../ui/title/title'
import styles from './popup-items.module.scss'
import CloseButton from '../ui/close-button/close-button';

interface IPopupItems {
  items: ISize[];
  handleAddToCartClick: () => void;
}

export default function PopupItems({ items, handleAddToCartClick }: IPopupItems) {
  return (
    <div className={styles['popup-items']}>
      <div className={styles['popup-items__content']}>
        <div className={styles['flex-col']}>
          <Title weight='bold'>
            Choose the size
          </Title>
          <CloseButton onClick={handleAddToCartClick}/>
        </div>
        <div className={styles['items-wrapper']}>
          {items.map((item) => {
            const activeClass = item.available 
            ? styles['button_available'] 
            : styles['button_unavailable']
            return (
              <Button key={item.id} className={activeClass} disabled={!item.available}>
                 {item.abbreviation}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
};
