import styles from './card-skeleton.module.scss';

interface ICardSkeleton {
  info?: boolean;
}

export default function CardSkeleton({ info = true }: ICardSkeleton) {

  return (
    <div className={styles['card-skeleton']}>
      <div className={styles['card-skeleton__image']} />
      {info ?
        <div className={`
        ${styles['card-skeleton__info-section']} 
        ${styles['info-section']}
        `}>
          <div className={styles['info-section__title']}>
            <div className={styles['info-section__title-row']} />
            <div className={styles['info-section__title-row']} />
          </div>
          <div className={styles['info-section__color']} />
          <div className={styles['info-section__prices']}>
            <div className={styles['info-section__prices-old']} />
            <div className={styles['info-section__prices-new']} />
          </div>
          <div className={styles['info-section__button']} />
        </div>
        : null}
    </div>
  )
};
