import Link from "next/link";
import CloseButton from "../../close-button/close-button";
import { navItems } from "@/constants/nav-items";

export default function HamburgerContent() {
  return (
     <div className={`
              ${styles['navbar__sidebar-content']} 
              ${styles['sidebar-content']}
            `}>
                <div className={styles['sidebar-content__block']}>
                  <CloseButton onClose={handleHamburgerClick} />
                  <ul className={styles['sidebar-content__list']}>
                    <Link href='/' className={styles['logo-link_mobile']}>
                      <LogoImage />
                    </Link>
                    {navItems.map((item, index) => (
                      <li key={index} className={styles['sidebar-content__item']}>
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            if (item.subItems && item.subItems.length > 0) {
                              e.preventDefault();
                              handleDropdownSecond(index)
                            }
                          }}
                          className={`${styles['sidebar-content__link']} ${styles.link}`}
                        >
                          <div className={styles.link__inner}>
                            {item.title}
                            {item.subItems && item.subItems.length > 0 && (
                              <IoIosArrowDown
                                className={styles['navbar__link-arrow']}
                              />
                            )}
                          </div>
                          {activeDropdownSecond === index && item.subItems && item.subItems.length > 0 && (
                            <div className={styles['sidebar-content__dropdown']}>
                              <Divider />
                              <div className={styles['sidebar-content__dropdown-inner']}>
                                <ul>
                                  {item.subItems?.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      <NavLink href={subItem.href} onClick={(e) => e.stopPropagation()}>
                                        {subItem.title}
                                      </NavLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <Divider />
                            </div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
  )
};