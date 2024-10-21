import Image from "next/image";
import { logo } from "@/constants/logo";
import styles from './logo.module.scss'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        src={logo}
        alt='logo'
        fill
        priority
        className={styles['logo-image']}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
      />
    </div>
  )
};
