import { useState } from "react";
import Navbar from "../navbar/navbar";
import styles from './header.module.scss'

export default function Header() {
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

  return (
    <header className={`${styles.header} ${isSearchClicked ? styles.header_search : ''}`}>
      <Navbar isSearchClicked={isSearchClicked} setIsSearchClicked={setIsSearchClicked}/>
    </header>
  )
};
