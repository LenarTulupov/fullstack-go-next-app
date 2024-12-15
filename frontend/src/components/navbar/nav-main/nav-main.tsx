'use client'

import { navItems } from '@/constants/nav-items';
import styles from './nav-main.module.scss';
import NavLink from '@/components/ui/nav-link/nav-link';
import { IoIosArrowDown } from 'react-icons/io';
import DropdownMenu from '@/components/ui/dropdown-menu/dropdown-menu';
import { RefObject, SetStateAction } from 'react';
import Link from 'next/link';
import LogoImage from '@/components/ui/logo/logo'

interface INavMain {
  activeDropdown: number | null;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  itemRef: RefObject<HTMLLIElement>;
  dropdownPosition: { top: number; left: number } | null;
  setActiveDropdown: React.Dispatch<SetStateAction<number | null>>;
  // isHamburgerClick: boolean;
  sidebar: boolean;
}

export default function NavMain({
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
  itemRef,
  dropdownPosition,
  setActiveDropdown,
  // isHamburgerClick,
  sidebar }: INavMain) {
  return (
    <div className={`${styles.navbar__main} ${sidebar ? styles.navbar__main_sidebar : ''}`}>
      <ul className={`${styles.navbar__list} ${sidebar ? styles.navbar__list_sidebar : ''}`}>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`
                      ${styles.navbar__item}
                      ${activeDropdown === index ? styles['navbar__item_active'] : ''}
                    `}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
            ref={activeDropdown === index ? itemRef : null}
          >
            <NavLink href={item.href} className={styles.navbar__link}>
              {item.title}
              {item.subItems && item.subItems.length > 0 && (
                <>
                  <IoIosArrowDown
                    className={styles['navbar__link-arrow']}
                  />
                </>
              )}
              {activeDropdown === index && item.subItems && item.subItems.length > 0 && (
                <>
                  <div className={styles['navbar__link-hover-zone']} />
                  {dropdownPosition && (
                    <DropdownMenu
                      onClick={(e) => {
                        if (activeDropdown === index) {
                          e.preventDefault();
                        }
                      }}
                      items={item.subItems}
                      position={dropdownPosition}
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
};
