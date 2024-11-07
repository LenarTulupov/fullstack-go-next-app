import { colors, prices, sizes } from '@/constants/layout-items';
import Checkbox from '../checkbox/checkbox';
import Radio from '../radio/radio';
import LabelText from '../label-text/label-text';
import Container from '../container/container';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSize } from '@/store/sizeFilter/sizeFilterSlice';
import { toggleColor } from '@/store/colorFilter/colorFilterSlice';
import { RootState } from '@/store/store';
import styles from './dropdown.module.scss';
import { setPrice } from '@/store/priceFilter/priceFilterSlice';

interface IDropdown {
  item: string;
}

export default function Dropdown({ item }: IDropdown) {
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
    <div className={styles.dropdown}>
      <Container>
        <ul className={styles.dropdown__list}>
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
              <li key={uniqueId} className={styles.dropdown__item}>
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
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
};
