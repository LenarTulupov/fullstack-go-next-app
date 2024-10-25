import Image from 'next/image';
import styles from './zoom-image-popup.module.scss';
import { CSSProperties, MouseEvent, useState } from 'react';

interface IZoomImagePopup {
  src: string;
  alt: string;
}

export default function ZoomImagePopup({ src, alt }: IZoomImagePopup) {
  const [zoomStyle, setZoomStyle] = useState<CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const xPercent = (offsetX / offsetWidth) * 100;
    const yPercent = (offsetY / offsetHeight) * 100;

    setZoomStyle({
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundSize: '150%',
    });
  };

  return (
    <div
      className={styles['zoom-wrapper']}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundImage: `url(${src})`,
        ...(isHovered ? zoomStyle : { backgroundSize: 'cover' }),
      }}
    >
      <Image
        src={src}
        alt={alt}
        className={styles['zoom-image']}
        width={200}
        height={0}
        layout="responsive"
        priority
      />
    </div>
  );
}
