'use client'

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Container from '../ui/container/container';
import SearchImage from '../ui/search-image/search-image';
import LogoImage from '../ui/logo/logo';
import SearchBar from '../search-bar/search-bar';
import { navItems } from '@/constants/nav-items';
import Tooltip from '../ui/tooltip/tooltip';
import { IoIosArrowDown } from "react-icons/io";
import DropdownMenu from '../ui/dropdown-menu/dropdown-menu';
import styles from './navbar.module.scss';

export default function Navbar() {
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const searchBarFocus = useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);

  const oftenSearchedFor = ['dresses', 'summer'];

  const handleSearch = () => {
    setIsSearchClicked((prev) => !prev);
  };

  useEffect(() => {
    if (isSearchClicked && searchBarFocus.current) {
      searchBarFocus.current.focus();
    }
  }, [isSearchClicked]);

  const handleDropdownMouseEnter = (index: number) => {
    setIsDropdownOpen(index);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownOpen(null);
  };

  return (
    <nav className={styles.navbar}>
      <Container className={styles.navbar__container}>
        {!isSearchClicked ? (
          <div className={styles.navbar__wrapper}>
            <Link href='/'>
              <LogoImage />
            </Link>
            <div className={styles.navbar__main}>
              <ul className={styles.navbar__list}>
                {navItems.map((item, index) => {
                  const hasDropdown = index === 0;
                  return (
                    <li
                      key={index}
                      className={styles.navbar__item}
                      onMouseEnter={() =>
                        hasDropdown && handleDropdownMouseEnter(index)
                      }
                    >
                      <Link href={item.href} className={styles.navbar__link}>
                        {item.title}
                        {hasDropdown && (
                          <IoIosArrowDown
                            className={styles['navbar__link-arrow']}
                          />
                        )}
                      </Link>
                      {isDropdownOpen === index && hasDropdown && (
                        <DropdownMenu
                          onMouseEnter={() => { }}
                          onMouseLeave={handleDropdownMouseLeave}
                        />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={styles.navbar__sub}>
              <ul className={styles.navbar__list}>
                <li className={styles['navbar__item-search']}>
                  <Tooltip
                    position='bottom'
                    content='search panel'
                    className={styles['navbar__item-tooltip']}
                  >
                    <Link
                      href='/search'
                      className={styles['navbar__link-search']}
                      onClick={handleSearch}
                    >
                      <SearchImage />
                    </Link>
                  </Tooltip>
                </li>
                <li className={styles.navbar__item}>
                  <Link
                    href='/sign-in'
                    className={styles['navbar__link']}
                  >
                    Sign In
                  </Link>
                </li>
                <li className={styles.navbar__item}>
                  <Link
                    href='/favorite'
                    className={styles['navbar__link']}
                  >
                    Favorite<span>0</span>
                  </Link>
                </li>
                <li className={styles.navbar__item}>
                  <button className={styles['navbar__item-button']}>
                    Cart<span>0</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className={styles['search-bar-container']}>
              <SearchBar
                className={styles['search-bar']}
                onClick={handleSearch}
                ref={searchBarFocus}
              />
            </div>
            <div className={styles['search-bar__suggested-items']}>
              <div>often searched for</div>
              <div className={styles['suggested-items__list']}>
                {oftenSearchedFor.map((item) => (
                  <Link key={item} href={`/${item}`}>
                    <div>{item}</div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </nav >
  )
}
