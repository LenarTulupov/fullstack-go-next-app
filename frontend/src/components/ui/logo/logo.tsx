import Image from "next/image";
import { logo } from "@/constants/logo";
import styles from './logo.module.scss'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Image
        src={logo}
        alt='logo'
        width={100}
        height={30}
        layout='intrinsic'
        priority
      />
    </div>
  )
};
