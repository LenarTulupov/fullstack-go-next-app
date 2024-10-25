import Image from "next/image";
import CloseButton from "../ui/close-button/close-button";
import styles from './size-chart-content.module.scss';

interface ISizeChartContent {
  handleSizeChart: () => void;
}

export default function SizeChartContent(
  { handleSizeChart }: ISizeChartContent) {
  const sizesImage = 
  'https://cdn.kiwisizing.com/simpleretro-1610555643896.png';
  return (
      <div className={styles['size-chart-content']}>
        <div className={styles['text-wrapper']}>
          <CloseButton onClick={handleSizeChart} />
        </div>
        <div className={styles.subtitle}>Size Charts</div>
        <div />
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
