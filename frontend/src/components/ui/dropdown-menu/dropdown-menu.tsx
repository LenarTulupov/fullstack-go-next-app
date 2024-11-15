import Link from 'next/link';
import styles from './dropdown-menu.module.scss';
import { INavItems } from '@/types/nav-items.interface';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface IDropdownMenu {
  items: INavItems[];
  position: { top: number; left: number };
  onClose: () => void;
}

export default function DropdownMenu({ items, position, onClose }: IDropdownMenu) {
  const dropdownRoot = typeof document !== "undefined" ? document.getElementById('dropdown-root') : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRoot && !dropdownRoot.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, dropdownRoot]);

  if(!dropdownRoot) {
    return null;
  }
  return createPortal(
    <div 
      className={styles['dropdown-menu']}
      style={{
        position: 'absolute',
        top: position.top,
        left: `calc(${position.left}px - 30px)`,
      }}
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      <ul className={styles['dropdown-menu__list']}>
        {items.map((item, index) => (
          <li key={index} className={styles['dropdown-menu__item']}>
            <Link href={item.href}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>,
    dropdownRoot
  );
}
