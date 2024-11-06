import { colors, sizes } from '@/constants/layout-items';
import styles from './dropdown.module.scss';
import { prices } from '@/constants/filter-items';
import Checkbox from '../checkbox/checkbox';
import Radio from '../radio/radio';
import LabelText from '../label-text/label-text';
import Container from '../container/container';

interface IDropdown {
  item: string;
}

export default function Dropdown({ item }: IDropdown) {
  let items: string[] = [];
  if (item === "color") {
    items = colors
  } else if (item === "size") {
    items = sizes
  } else if (item === "price") {
    items = prices
  }

  const isPrice = item === 'price';

  return (
    <div className={styles.dropdown}>
      <Container>
        <ul className={styles.dropdown__list}>
          {items.map((item, index) => (
            <li key={index} className={styles.dropdown__item}>
              {isPrice ? (
                <Radio
                  id={item}
                  className={styles['dropdown__item-radio']}
                />
              ) : (
                <Checkbox
                  id={item}
                  className={styles['dropdown__item-checkbox']}
                />
              )}
              <LabelText
                htmlFor={item}
                className={styles['dropdown__item-label']}
              >
                {item}
              </LabelText>
            </li>
          ))
          }
        </ul>
      </Container>
    </div>
  )
};
