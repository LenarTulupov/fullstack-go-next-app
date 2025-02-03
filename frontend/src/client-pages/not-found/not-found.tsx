import Link from "next/link";
import styles from "./not-found.module.scss";
import Image from "next/image";

export default function NotFound() {
  const src =
    "https://burst.shopifycdn.com/photos/high-fashion-model-in-red.jpg?width=1850&format=pjpg&exif=0&iptc=0";
  return (
    <div className={styles["not-found"]}>
      <div className={styles["not-found__wrapper"]}>
        <div className={styles["not-found__image-wrapper"]}>
          <Image
            alt="not found image"
            src={src}
            className={styles["not-found__image"]}
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className={styles["not-found__content"]}>
          <div className={styles["not-found__content-container"]}>
            <h1 className={styles["not-found__title"]}>oh no</h1>
            <h2 className={styles["not-found__subtitle"]}>page not found.</h2>
            <p className={styles["not-found__description"]}>
              There could be a problem with the URL or the page no longer
              exists.
            </p>
            <Link href="/" className={styles["not-found__link"]}>
              go to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
