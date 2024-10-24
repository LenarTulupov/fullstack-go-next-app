import Link from 'next/link';
import styles from './dropdown-menu.module.scss';
import { createPortal } from 'react-dom';
import useProducts from '@/utils/useProducts';

interface IDropdownMenu {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DropdownMenu(
  { onMouseEnter, onMouseLeave }: IDropdownMenu) {
  const { products } = useProducts();
  const uniqueSubcategories = Array.from(
    new Set(products
      .filter(product => product.subcategory)
      .map(product => product.subcategory)
    )
  );

  return createPortal(
    <div
      className={styles['dropdown-menu']}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles['dropdown-menu__wrapper']}>
        <ul className={styles['dropdown-menu__wrapper-list']}>
          {uniqueSubcategories.map((subcategory, index) => (
            <li key={index}>
              <Link href={`/categories/${subcategory}`}>
                {subcategory.slice(0, 1).toUpperCase() + subcategory.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};
