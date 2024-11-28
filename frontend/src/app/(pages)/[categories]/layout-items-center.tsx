import { filterItems } from '@/constants/filter-items';
import styles from './layout-items-center.module.scss';

interface ILayoutItemsCenter {
  onClick: (item: string) => void;
  filtersApplied: boolean;
  handleResetFilters: () => void;
}

export default function LayoutItemsCenter({ onClick, filtersApplied, handleResetFilters }: ILayoutItemsCenter) {
  return (
    <div className={`
      ${styles['layout-category__list-center']} 
      ${styles['list-center']}
      `}>
      {filterItems.map((item) => {
        const itemWithFirstUpperLetter =
          item.at(0)?.toUpperCase() + item.slice(1);
        return (
          <button
            key={item}
            className={styles['list-center__item']}
            onClick={() => onClick(item)}
          >
            {itemWithFirstUpperLetter}
          </button>
        );
      })}
      {filtersApplied && (
        <button
          className={styles['list-center__item-reset']}
          onClick={handleResetFilters}
        >
          Reset
        </button>
      )}
    </div>
  )
};
