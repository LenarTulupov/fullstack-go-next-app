import { filterItems } from '@/constants/filter-items';
import Dropdown from '@/components/ui/dropdown/dropdown';
import styles from './layout-items-center.module.scss';

interface ILayoutItemsCenter {
  onClick: (item: string) => void;
  filtersApplied: boolean;
  handleResetFilters: () => void;
  activeItem?: string | null;
  isMobile?: boolean;
}

export default function LayoutItemsCenter({
  onClick,
  filtersApplied,
  handleResetFilters,
  activeItem,
  isMobile }: ILayoutItemsCenter) {
  return (
    <div className={`
      ${styles['layout-category__list-center']} 
      ${styles['list-center']}
      `}>
      {filterItems.map((item) => {
        const itemWithFirstUpperLetter =
          item.at(0)?.toUpperCase() + item.slice(1);
        const isActive = activeItem === item;
        return (
          <>
            <button
              key={item}
              className={styles['list-center__item']}
              onClick={() => onClick(item)}
            >
              {itemWithFirstUpperLetter}
            </button>
            {isMobile && isActive && (
              <div className={styles['layout-category__selected-items']}>
                {activeItem && <Dropdown isMobile isStatic item={activeItem} />}
              </div>
            )}
          </>
        );
      })}
      {filtersApplied && (
        <button
          className={`
            ${styles['list-center__item-reset']} 
            ${isMobile ? styles['list-center__item-reset_mobile'] : ''}
          `}
          onClick={handleResetFilters}
        >
          Reset
        </button>
      )}
    </div>
  )
};

