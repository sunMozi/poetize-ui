import { FiHeart, FiTool, FiMail, FiMessageCircle } from 'react-icons/fi';

export const navItems = [
  { label: '家', path: '/love', icon: <FiHeart size={20} /> },
  { label: '百宝箱', path: '/favorite', icon: <FiTool size={20} /> },
  { label: '留言', path: '/message', icon: <FiMail size={20} /> },
  { label: '联系我', path: '/contact', icon: <FiMessageCircle size={20} /> },
];
