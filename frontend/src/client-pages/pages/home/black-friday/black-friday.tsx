'use client'

import Title from "@/components/ui/title/title";
import Image from "next/image";
import Container from "@/components/ui/container/container";
import { blackFridayImages } from "@/constants/black-friday";
import styles from './black-friday.module.scss';
import { motion, useInView } from 'framer-motion'
import { useRef } from "react";
import Link from "next/link";

export default function BlackFriday() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' })
  return (
    <section className={styles['black-friday']}>
      <Container>
        <motion.div
          ref={ref}
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 1,
            ease: 'easeInOut'
          }}
        >
          <Title className={styles['black-friday__title']}>
            Black Friday
          </Title>
        </motion.div>
        <Link href='/category/trends' className={styles['black-friday__link']}>
          {blackFridayImages.map((url, index) => (
            <motion.div className={styles['black-friday__link-wrapper']}
              key={index}
              initial={{
                x: index === 0 ? -200 : 200,
                opacity: 0,
              }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{
                duration: 1.2,
                ease: 'easeInOut',
              }}
            >
              <Image
                className={styles['black-friday__image']}
                alt="black friday promo"
                src={url}
                width={0}
                height={0}
                layout="responsive"
              />
            </motion.div>
          ))}
        </Link>
      </Container>
    </section>
  )
};
