import React from 'react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  width?: number; // 可自定义宽度，默认 256px
  position?: 'left' | 'right'; // 支持左右侧边栏
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  width = 256,
  position = 'left',
  children,
}) => {
  const translateX = position === 'left' ? '-100%' : '100%';
  const motionStyle =
    position === 'left'
      ? { x: isOpen ? 0 : translateX }
      : { x: isOpen ? 0 : translateX };

  return (
    <motion.aside
      initial={{ x: translateX }}
      animate={motionStyle}
      transition={{ type: 'tween', duration: 0.3 }}
      className={`fixed top-0 ${position}-0 z-50 h-screen bg-base-200 shadow-lg`}
      style={{ width }}
    >
      <div className="flex flex-col h-full">
        {onClose && (
          <div className="flex justify-end p-2">
            <button className="btn btn-sm btn-ghost" onClick={onClose}>
              关闭
            </button>
          </div>
        )}
        <div className="flex-1 p-4 overflow-auto">{children}</div>
      </div>
    </motion.aside>
  );
};
