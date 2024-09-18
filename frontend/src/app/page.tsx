import styles from "./page.module.scss";
import Home from "./(pages)/home/home";

export default function Page() {
  return (
    <div className={styles.page}>
      <Home />
    </div>
  );
}
