'use client';

import Link from 'next/link';
import styles from './dropdown-menu.module.scss';
import { INavItems } from '@/types/nav-items.interface';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface IDropdownMenu {
  items: INavItems[];
  position: { top: number; left: number };
  onClose: () => void;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function DropdownMenu({ items, position, onClose, onClick }: IDropdownMenu) {
  const [dropdownRoot, setDropdownRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('dropdown-root');
    setDropdownRoot(root);

    const handleClickOutside = (event: MouseEvent) => {
      if (root && !root.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!dropdownRoot) {
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
      onClick={onClick}
    >
      <ul className={styles['dropdown-menu__list']}>
        {items.map((item, index) => (
          <li key={index} className={styles['dropdown-menu__item']}>
            <Link href={item.href} className={styles['dropdown-menu__link']}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>,
    dropdownRoot
  );
}
