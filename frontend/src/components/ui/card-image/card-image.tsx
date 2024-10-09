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
}

export default function CardImage(
  { src, alt, className, handleImageHover, isImageHovered, id }: ICardImage) {
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
          objectFit="cover"
          loading="lazy"
        />
      </div>
    </div>
  )
};
