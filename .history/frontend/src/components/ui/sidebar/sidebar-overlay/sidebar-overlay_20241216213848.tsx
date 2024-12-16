import styles from './sidebar-overlay.module.scss';



export default function SidebarOverlay() {
  return (
    <div className={styles.sidebar__overlay}>
        { children }
    </div>
  )
};
