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
  // const { products } = useProducts();
  // const uniqueSubcategories = Array.from(
  //   new Set(products
  //     .filter(product => product.subcategory)
  //     .map(product => product.subcategory)
  //   )
  // );

  const subcategories = ['Trousers', 'Jackets', 'Bikinis'];

  return createPortal(
    <div
      className={styles['dropdown-menu']}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles['dropdown-menu__wrapper']}>
        <ul className={styles['dropdown-menu__wrapper-list']}>
          {subcategories.map((subcategory, index) => (
            <li key={index} className={styles['dropdown-menu__wrapper-item']}>
              <Link href={`/categories/${subcategory.toLowerCase()}`}>
                {subcategory}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};
