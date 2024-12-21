export default function SidebarContent({
  children,
  position = 'right',
  isSidebarOpened = false,
}: ISidebarContent) {
  const positionClass = position === 'left' ? 'left' : 'right';
  return (
    <div
      className={`${styles.sidebar__content} ${
        isSidebarOpened
          ? styles[`sidebar__content-${positionClass}_opened`]
          : styles[`sidebar__content-${positionClass}`]
      }`}
    >
      {children}
    </div>
  );
}
