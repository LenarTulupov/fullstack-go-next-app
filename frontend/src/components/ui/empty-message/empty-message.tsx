import Title from '../title/title';
import { ReactNode } from 'react';
import styles from './empty-message.module.scss';

interface IEmptyMessage {
  message: string;
  icon?: ReactNode;
  className?: string;
}

export default function EmptyMessage({ message, icon, className }: IEmptyMessage) {
  return (
    <div className={`${styles['empty-message']} ${className || ''}`}>
      <Title
        className={styles['empty-message__title']}
        weight='bold'
      >
        {message}
      </Title>
      {icon && <div className={styles['empty-message__icon']}>
        {icon}
      </div>}
    </div>
  )
};
