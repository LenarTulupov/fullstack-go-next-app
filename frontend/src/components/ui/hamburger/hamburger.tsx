import styles from './hamburger.module.scss';

interface IHamburger {
  isHamburgerClick: boolean;
  onClick: () => void;
}

export default function Hamburger({ isHamburgerClick, onClick }: IHamburger) {
  return (
    <button className={styles.hamburger} onClick={onClick}>
        <div className={`${styles.hamburger__bar} ${isHamburgerClick ? styles.hamburger__bar_active : ''}`}/>
        <div className={`${styles.hamburger__bar} ${isHamburgerClick ? styles.hamburger__bar_active : ''}`}/>
        <div className={`${styles.hamburger__bar} ${isHamburgerClick ? styles.hamburger__bar_active : ''}`}/>
    </button>
  )
};
