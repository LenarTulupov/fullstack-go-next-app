import styles from './dashboard.module.scss'

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
        Dashboard
        <aside>
          <div>Dashboard</div>
          <div>Users</div>
          <div>Products</div>
          <div>Transactios</div>
          <div>Revenue</div>
          <div>Reports</div>
          <div>Teams</div>
          <div>Settings</div>
          <div>Help</div>
          <div>Logout</div>
        </aside>
    </div>
  )
};
