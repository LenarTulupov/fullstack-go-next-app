import Navbar from "../navbar/navbar";
import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <Navbar />
    </header>
  )
};
