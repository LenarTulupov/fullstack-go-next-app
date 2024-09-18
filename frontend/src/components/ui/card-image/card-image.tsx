import Image from "next/image";
import styles from './card-image.module.scss'

interface ICardImage {
  src: string;
  alt: string;
  className?: string;
}

export default function CardImage({ src, alt, className }: ICardImage ) {
  return (
    <div className={`${styles['card-image']} ${className || ''}`}>
      <Image
        src={src}
        alt={alt}
        fill
        objectFit="cover"
        loading="lazy"
      />
    </div>
  )
};
