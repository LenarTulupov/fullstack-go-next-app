import { ISize } from '@/types/sizes.interface'
import Button from '../ui/button/button'
import Title from '../ui/title/title'
import CloseButton from '../ui/close-button/close-button';
import styles from './popup-items-content.module.scss'

interface IPopupItemsContent {
  items: ISize[];
  // handleAddToCartClick: () => void;
  handleAddToCartClick: (size: ISize) => void;
  onClose?: () => void;
}

export default function PopupItemsContent({
  items, handleAddToCartClick, onClose }: IPopupItemsContent) {
  return (
    <div className={styles['popup-items-content']}>
      <div className={styles['popup-items-content__title']}>
        <Title weight='bold'>
          Choose the size
        </Title>
        <CloseButton onClick={onClose} />
      </div>
      <div className={styles['popup-items-content__wrapper']}>
        {items
          .filter(item => item.available)
          .map(item => {
            console.log(item.abbreviation)
            return (
              <Button
                key={item.id}
                onClick={() => handleAddToCartClick(item)}
                disabled={!item.available}
              >
                {item.abbreviation}
              </Button>
            )
          })}
      </div>
    </div>
  )
};
