import { ISize } from '@/types/sizes.interface'
import Button from '../ui/button/button'
import styles from './sizes.module.scss'

interface ISizes {
  sizes: ISize[];
}

export default function Sizes({ sizes }: ISizes) {
  return (
    <div className={styles.sizes}>
      {sizes.map((size) => (
        <Button
          key={size.id}
          className={styles['sizes__size-button']}
          variant='white'
        >
          {size.abbreviation}
        </Button>
      ))}
    </div>
  )
};
