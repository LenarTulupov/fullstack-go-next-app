'use client'

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navItems } from '@/constants/nav-items';
import { useSearchBarValue, useSetSearchBarValue } from '@/hooks/useSearchBarValue';
import { IProduct } from '@/types/product.interface';
import { IoIosArrowDown } from "react-icons/io";
import Container from '../ui/container/container';
import SearchImage from '../ui/search-image/search-image';
import LogoImage from '../ui/logo/logo';
import SearchBar from '../search-bar/search-bar';
import Tooltip from '../ui/tooltip/tooltip';
import DropdownMenu from '../ui/dropdown-menu/dropdown-menu';
import useProducts from '@/utils/useProducts';
import Card from '../card/card';
import ProductsGrid from '../ui/products-grid/products-grid';
import Title from '../ui/title/title';
import Button from '../ui/button/button';
import styles from './navbar.module.scss';
import CardSkeleton from '../ui/card-skeleton/card-skeleton';
import { useSelector } from 'react-redux';
import { selectFavorites } from '@/store/favorites/favoritesSlice';
import useCart from '@/hooks/useCart';
import CartService from '@/services/cart.service';

export default function Navbar() {
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const searchBarFocus = useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
  const searchBarValue = useSearchBarValue();
  const setSearchBarValue = useSetSearchBarValue();
  const [showFilteredProducts, setShowFilteredProducts] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const favorites = useSelector(selectFavorites);
  const { productsQuantity } = CartService();

  const handleSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(e.target.value);
  }

  const { products, isLoading } = useProducts();
  const { handleCartSidebarToggle } = useCart();

  const filteredProducts = products.filter((product: IProduct) => {
    const searchTerms = searchBarValue
      .toLowerCase()
      .split(' ')
      .filter(term => term);

    return searchTerms.every((term) => {
      return (
        product.title.toLowerCase().includes(term)
      )
    });
  });

  const handleSearch = () => {
    setIsSearchClicked((prev) => {
      if (prev) {
        setSearchBarValue('')
        setShowFilteredProducts(false);
      }
      return !prev;
    })
  };

  const clearInputValue = () => {
    setSearchBarValue('');
  }

  const handleShowFilteredProducts = () => {
    setShowFilteredProducts(true);
    router.push(`/search?name=${encodeURIComponent(searchBarValue)}`)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleShowFilteredProducts();
    }
  }

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
      {!isSearchClicked ? (
        <Container className={styles.navbar__container}>
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
                        hasDropdown ? handleDropdownMouseEnter(index) : handleDropdownMouseLeave()
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
                          onMouseEnter={() => {}}
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
                    <button
                      className={styles['navbar__button-search']}
                      onClick={handleSearch}
                    >
                      <SearchImage />
                    </button>
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
                    Favorite<span>{favorites.length}</span>
                  </Link>
                </li>
                <li className={styles.navbar__item}>
                  <button 
                    className={styles['navbar__item-button']}
                    onClick={handleCartSidebarToggle}
                  >
                    Cart<span>{productsQuantity}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      ) : (
        <>
          <Container className={styles['search-bar__container']}>
            <SearchBar
              className={styles['search-bar']}
              onClick={clearInputValue}
              value={searchBarValue}
              onChange={handleSearchBar}
              ref={searchBarFocus}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={handleShowFilteredProducts}>
              Search
            </Button>
            <Button variant='white' onClick={handleSearch}>
              Close
            </Button>
          </Container>
          {pathname !== '/search' && (
            <div className={styles['search-bar__products-wrapper']}>
              <Container className={styles['search-bar__products-container']}>
                <Title className={styles['search-bar__products-title']}>
                  Popular Products
                </Title>
                <ProductsGrid>
                  {!showFilteredProducts
                    ? isLoading
                      ? Array.from({ length: 5 }).map((_, index) => (
                        <CardSkeleton key={index} />
                      ))
                      : products
                        .filter((product) =>
                          product.categories?.includes('trends')
                        )
                        .slice(0, 5)
                        .map((product) => (
                          <Card
                            key={product.id}
                            product={product}
                          />
                        ))
                    : filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        product={product}
                      />
                    ))}
                </ProductsGrid>
                <Button className={styles['search-bar__products-button']}>
                  Show All
                </Button>
              </Container>
            </div>
          )}
        </>
      )}
    </nav>
  )
}
