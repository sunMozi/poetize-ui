import React from 'react';
import { motion } from 'framer-motion';

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  onClick?: () => void;
  permissionCode?: string; // 预留权限码
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  menuItems,
}) => {
  const renderMenu = (items: MenuItem[]) => (
    <ul className="min-h-full p-4 menu w-72 bg-base-200 text-base-content">
      {items.map((item) => (
        <li key={item.key}>
          {item.children ? (
            <details open>
              <summary className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </summary>
              {renderMenu(item.children)}
            </details>
          ) : (
            <a onClick={item.onClick} className="flex items-center">
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={onClose}
        hidden
      />
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 left-0 z-50 h-full"
      >
        <div className="h-full drawer-side">
          <label onClick={onClose} className="drawer-overlay"></label>
          {renderMenu(menuItems)}
        </div>
      </motion.div>
    </>
  );
};
