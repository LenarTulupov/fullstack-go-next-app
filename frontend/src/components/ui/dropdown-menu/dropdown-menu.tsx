import Link from 'next/link';
import styles from './dropdown-menu.module.scss';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { productsData } from '@/store/products/productsSlice';

interface IDropdownMenu {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DropdownMenu({ onMouseEnter, onMouseLeave }: IDropdownMenu) {
  const products = useSelector(productsData);
  const uniqueSubcategories = Array.from(new Set(products.map(product => product.subcategory)))
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
                {subcategory.slice(0,1).toUpperCase() + subcategory.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  )
};
