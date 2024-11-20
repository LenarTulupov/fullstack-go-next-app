import Image from "next/image";
import { MouseEvent } from "react";
import styles from './card-image.module.scss'

interface ICardImage {
  src: string;
  alt: string;
  className?: string;
  handleImageHover: (event: MouseEvent) => void;
  isImageHovered: boolean;
  id: number;
  priority?: boolean;
  onLoad: () => void;
}

export default function CardImage(
  { src, alt, className, handleImageHover, isImageHovered, id, priority = false, onLoad }: ICardImage) {
  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleImageHover}
      onMouseLeave={handleImageHover}
    >
      <div
        className={`
        ${styles['card-image']} ${className || ''} 
        ${isImageHovered ? styles['card-image_hovered'] : ''}
        `}
      >
        <Image
          src={src}
          alt={alt}
          fill
          // layout="responsive"
          // width={0}
          // height={0}
          loading={priority ? undefined : 'lazy'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          priority={priority}
          className={styles.image}
          onLoad={onLoad}
        />
      </div>
    </div>
  )
};
