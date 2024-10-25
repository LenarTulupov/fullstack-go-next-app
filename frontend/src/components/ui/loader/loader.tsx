import styles from './loader.module.scss';


export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__animation} />
      <div className={styles.loader__text}>Loading...</div>
    </div>
  )
};
