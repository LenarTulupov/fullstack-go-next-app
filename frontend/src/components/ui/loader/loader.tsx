import styles from './loader.module.scss';

interface ILoader {
  className?: string;
}

export default function Loader({ className }: ILoader) {
  return (
    <div className={`${styles.loader} ${className || ''}`}>
      <div className={styles.loader__animation} />
      <div className={styles.loader__text}>Loading...</div>
    </div>
  )
};
