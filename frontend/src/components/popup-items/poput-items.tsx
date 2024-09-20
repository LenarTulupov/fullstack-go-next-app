import { ISize } from '@/types/sizes.interface'
import Button from '../ui/button/button'
import Title from '../ui/title/title'
import styles from './popup-items.module.scss'

interface IPopupItems {
  items: ISize[];
}

export default function PopupItems({ items }: IPopupItems) {
  return (
    <div className={styles['popup-items']}>
      <div className={styles['popup-items__content']}>
        <div className={styles['flex-col']}>
          <Title weight='bold'>
            Choose the size
          </Title>
          {/* <CloseButton onClick={onClick}/> */}
        </div>
        <div className={styles['items-wrapper']}>
          {items.map((item) => {
            return (
              <Button key={item.id}>
                 {item.abbreviation}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
};
