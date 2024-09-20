import { IFilterItems } from '@/types/filter-items.interface'
import CheckboxItem from '../checkbox-item/checkbox-item'
import styles from './filter-items.module.scss'
import RadioItem from '../radio-item/radio-item'

export default function FilterItems({ items }: IFilterItems) {
  return (
    <div className={styles['filter-items']}>
      {items.map((item) => {
        console.log(item)
        return (
          <>
            <CheckboxItem

            />
            <RadioItem 

            />
          </>
        )
      })}
    </div>
  )
};
