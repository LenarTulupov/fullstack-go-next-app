import Image from "next/image";
import styles from './size-chart-content.module.scss';

export default function SizeChartContent({ onClose }) {
  const sizesImage =
    'https://cdn.kiwisizing.com/simpleretro-1610555643896.png';
  return (
    <div className={styles['size-chart-content']}>
      <div className={styles.subtitle}>Size Charts</div>
      <Image
        src={sizesImage}
        alt="Choose sizes"
        width={0}
        height={0}
        layout="responsive"
      />
    </div>
  )
};
