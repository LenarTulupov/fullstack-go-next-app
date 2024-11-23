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
import useProducts from '@/utils/useProducts';
import Card from '../card/card';
import ProductsGrid from '../ui/products-grid/products-grid';
import Title from '../ui/title/title';
import Button from '../ui/button/button';
import CardSkeleton from '../ui/card-skeleton/card-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '@/store/favorites/favoritesSlice';
import useCart from '@/hooks/useCart';
import CartService from '@/services/cart.service';
import DropdownMenu from '../ui/dropdown-menu/dropdown-menu';
import styles from './navbar.module.scss';
import { setFilteredProducts } from '@/store/searchProducts/searchProductsSlice';
import { MdOutlineHorizontalRule, MdOutlineMaximize, MdOutlineMinimize } from 'react-icons/md';
import Hamburger from '../ui/hamburger/hamburger';

export default function Navbar() {
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const searchBarFocus = useRef<HTMLInputElement>(null);
  const searchBarValue = useSearchBarValue();
  const setSearchBarValue = useSetSearchBarValue();
  const [showFilteredProducts, setShowFilteredProducts] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const favorites = useSelector(selectFavorites);
  const { productsQuantity } = CartService();
  const { products, isLoading } = useProducts();
  const { handleCartSidebarToggle } = useCart();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const itemRef = useRef<HTMLLIElement | null>(null);
  const dispatch = useDispatch();
  const [isHamburgerClick, setIsHamburgerClick] = useState<boolean>(false);

  const handleHamburgerClick = () => {
    setIsHamburgerClick(p => !p)
  }

  const handleMouseEnter = (index: number) => {
    setActiveDropdown(index)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const handleSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(e.target.value);
  }

  const filteredProducts = products.filter((product: IProduct) => {
    const searchTerms = searchBarValue
      .toLowerCase()
      .split(' ')
      .filter(term => term);

    return searchTerms.every((term) => {
      return (
        product.title.toLowerCase().includes(term) ||
        product.color.toLowerCase().includes(term) ||
        product.subcategory?.toLowerCase().includes(term) ||
        product.categories?.some(category => category.toLowerCase().includes(term)) ||
        product.sizes?.some(size =>
          size.name && size.available === true && size.name.toLowerCase().includes(term))
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
    // setShowFilteredProducts(true);
    dispatch(setFilteredProducts(filteredProducts));
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

  useEffect(() => {
    if (pathname !== '/search') {
      setIsSearchClicked(false)
    }
  }, [pathname]);

  useEffect(() => {
    if (activeDropdown !== null && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setDropdownPosition({ top: rect.bottom + 8, left: rect.left + 24 });
    }
  }, [activeDropdown]);

  return (
    <nav className={styles.navbar}>
      {!isSearchClicked ? (
        <Container className={styles.navbar__container}>
          <div className={styles.navbar__wrapper}>
            {/* <Hamburger isHamburgerClick={isHamburgerClick} onClick={handleHamburgerClick}/> */}
            <Link href='/' className={styles['logo-link']}>
              <LogoImage />
            </Link>
            <div className={styles.navbar__main}>
              <ul className={styles.navbar__list}>
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={`
                      ${styles.navbar__item}
                      ${activeDropdown === index ? styles['navbar__item_active'] : ''}
                    `}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    ref={activeDropdown === index ? itemRef : null}
                  >
                    <Link
                      href={item.href}
                      className={styles.navbar__link}
                    >
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
                    </Link>
                  </li>
                ))}
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
                    : filteredProducts.map((product) => {
                      console.log(filteredProducts)
                      return (
                        <Card
                          key={product.id}
                          product={product}
                        />
                      )
                    })}
                </ProductsGrid>
                <Button className={styles['search-bar__products-button']}>
                  Show All
                </Button>
              </Container>
            </div>
          )}
        </>
      )
      }
    </nav >
  )
}
