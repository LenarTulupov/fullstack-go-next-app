import { colors, prices, sizes } from '@/constants/layout-items';
import Checkbox from '../checkbox/checkbox';
import Radio from '../radio/radio';
import LabelText from '../label-text/label-text';
import Container from '../container/container';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSize } from '@/store/size-filter/size-filter-slice';
import { toggleColor } from '@/store/color-filter/color-filter-slice';
import { RootState } from '@/store/store';
import styles from './dropdown.module.scss';
import { setPrice } from '@/store/price-filter/price-filter-slice';

interface IDropdown {
  item: string;
  isStatic?: boolean;
  isMobile?: boolean;
}

export default function Dropdown({ item, isStatic = false, isMobile = false }: IDropdown) {
  const dispatch = useDispatch();
  const selectedSizes = useSelector((state: RootState) =>
    state.sizeFilter.selectedSizes);
  const selectedColors = useSelector((state: RootState) =>
    state.colorFilter.selectedColors);
  const selectedPrice = useSelector((state: RootState) =>
    state.priceFilter.selectedPrice)

  const handleSizeSelect = (size: string) => {
    dispatch(toggleSize(size));
  };

  const handleColorSelect = (color: string) => {
    dispatch(toggleColor(color));
  };

  const handlePriceSelect = (price: string) => {
    dispatch(setPrice(price));
  }

  const items = item === 'color'
    ? colors
    : item === 'size'
      ? sizes
      : prices;
  const isPrice = item === 'price';

  const handleCheckboxChange = (value: string) => () => {
    if (item === 'size') {
      handleSizeSelect(value);
    } else if (item === 'color') {
      handleColorSelect(value);
    }
  };

  const handleRadioChange = (value: string) => () => {
    if (item === 'price') {
      handlePriceSelect(value);
    }
  }

  return (
    <div className={`${styles.dropdown} ${isStatic ? styles.dropdown_static : ''}`}>
      <Container className={styles.container}>
        <ul className={`${styles.dropdown__list} ${styles.dropdown__list_mobile}`}>
          {items.map((itemValue, index) => {
            const uniqueId = `${itemValue}-${index}`;
            const isChecked =
              item === 'size'
                ? selectedSizes.includes(itemValue)
                : item === 'color'
                  ? selectedColors.includes(itemValue)
                  : item === 'price'
                    ? selectedPrice === itemValue
                    : false;

            return (
              <li
                key={uniqueId}
                className={`
                  ${styles.dropdown__item} 
                  ${isMobile ? styles.dropdown__item_mobile : ''}
                `}>
                <LabelText
                  htmlFor={uniqueId}
                  className={styles['dropdown__item-label-container']}
                >
                  {isPrice ? (
                    <Radio
                      id={uniqueId}
                      className={styles['dropdown__item-radio']}
                      onChange={handleRadioChange(itemValue)}
                      checked={isChecked}
                    />
                  ) : (
                    <Checkbox
                      id={uniqueId}
                      className={styles['dropdown__item-checkbox']}
                      onChange={handleCheckboxChange(itemValue)}
                      checked={isChecked}
                    />
                  )}
                  <LabelText
                    htmlFor={uniqueId}
                    className={styles['dropdown__item-label']}
                  >
                    {itemValue}
                  </LabelText>
                </LabelText>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};
