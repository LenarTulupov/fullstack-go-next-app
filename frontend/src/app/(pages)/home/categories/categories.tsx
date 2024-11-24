import { categories } from "@/constants/categories";
import Image from "next/image";
import styles from './categories.module.scss';
import Container from "@/components/ui/container/container";
import Link from "next/link";
import { motion, useInView } from 'framer-motion'
import { useRef } from "react";

export default function Categories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });
  return (
    <section className={styles.categories}>
      <Container>
        <div className={styles.categories__grid}>
          {categories.map((item, index) => (
            <>
              <motion.div
                ref={ref}
                initial={{ y: 200, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: .5,
                  ease: 'easeInOut',
                  delay: index * .2
                }}
              >
                <Link href={`/category/${item.name}`} className={styles['categories__link']}>
                  <Image
                    className={styles.categories__image}
                    key={index}
                    src={item.url}
                    alt={`category ${item.name}`}
                    width={0}
                    height={0}
                    layout="responsive"
                  />
                  <Link
                    href={`/category/${item.name}`}
                    className={styles['categories__link-sublink']}
                  >
                    {item.name}
                  </Link>
                </Link>
              </motion.div>
            </>
          ))}
        </div>
      </Container>
    </section >
  )
};
