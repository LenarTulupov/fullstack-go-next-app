import styles from './card-skeleton.module.scss';

export default function CardSkeleton() {
  return (
    <div className={styles['card-skeleton']}>
      <div className={styles['card-skeleton__image']} />
      <div className={`
          ${styles['card-skeleton__info-section']} 
          ${styles['info-section']}
      `}>
        <div className={styles['info-section__title']}>
          <div className={styles['info-section__title-row']}/>
          <div className={styles['info-section__title-row']}/>
        </div>
        <div className={styles['info-section__color']} />
        <div className={styles['info-section__prices']}>
          <div className={styles['info-section__prices-old']} />
          <div className={styles['info-section__prices-new']} />
        </div>
        <div className={styles['info-section__button']} />
      </div>
    </div>
  )
};
