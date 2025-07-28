function Sidebar({ children, className, asideClass }) {
  return (
    <aside className={`p-8 ${asideClass} `}>
      <div
        className={` flex h-full w-full flex-col overflow-hidden rounded-lg bg-white p-8 shadow-md ${className}`}
      >
        {children}
      </div>
    </aside>
  );
}

export default Sidebar;
