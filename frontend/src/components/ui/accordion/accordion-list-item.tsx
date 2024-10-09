import { ReactNode } from 'react';
import styles from './accordion-list-item.module.scss';


export default function AccordionListItem(
  { children }: { children: ReactNode}) {
  return (
    <div className={styles['accordion__list-item']}>
        { children }
    </div>
  )
};
