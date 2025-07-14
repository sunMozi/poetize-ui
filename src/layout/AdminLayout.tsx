import React, { useState, useMemo } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Button, Grid } from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  AppstoreOutlined,
  ShopOutlined,
  ControlOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const menuTree = [
  {
    key: '/admin',
    icon: <DashboardOutlined />,
    label: '仪表盘',
  },
  {
    key: '/admin/site',
    icon: <SettingOutlined />,
    label: '网站设置',
    children: [
      { key: '/admin/site/general', label: '常规设置' },
      { key: '/admin/site/seo', label: 'SEO 设置' },
      { key: '/admin/site/analytics', label: '数据分析' },
    ],
  },
  {
    key: '/admin/users',
    icon: <UserOutlined />,
    label: '用户管理',
  },
  {
    key: '/admin/content',
    icon: <AppstoreOutlined />,
    label: '内容管理',
    children: [
      { key: '/admin/categories', label: '分类管理' },
      { key: '/admin/articles', label: '文章管理' },
      { key: '/admin/comments', label: '评论管理' },
      { key: '/admin/treehole', label: '树洞管理' },
      { key: '/admin/resources', label: '资源管理' },
      { key: '/admin/resource-aggregation', label: '资源聚合' },
      { key: '/admin/wall', label: '表白墙' },
    ],
  },
  {
    key: '/admin/shop',
    icon: <ShopOutlined />,
    label: '商城管理',
    children: [
      { key: '/admin/products', label: '商品管理' },
      { key: '/admin/orders', label: '订单管理' },
      { key: '/admin/tickets', label: '工单管理' },
    ],
  },
  {
    key: '/admin/configs',
    icon: <ControlOutlined />,
    label: '配置管理',
  },
  {
    key: '/admin/system',
    icon: <SettingOutlined />,
    label: '系统设置',
  },
];

const generateMenuItems = (menus: typeof menuTree) =>
  menus.map(({ key, icon, label, children }) => {
    if (children) {
      return {
        key,
        icon,
        label,
        children: children.map((child) => ({
          key: child.key,
          label: <Link to={child.key}>{child.label}</Link>,
        })),
      };
    }
    return {
      key,
      icon,
      label: <Link to={key}>{label}</Link>,
    };
  });

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const screens = useBreakpoint();

  const [collapsed, setCollapsed] = useState(false);
  const isMobile = !screens.md;

  const selectedKey = useMemo(() => {
    const allKeys = menuTree.flatMap(({ key, children }) =>
      children ? children.map((c) => c.key) : [key]
    );
    const match = allKeys
      .filter((key) => location.pathname.startsWith(key))
      .sort((a, b) => b.length - a.length)[0];
    return match || '';
  }, [location.pathname]);

  const keyLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    menuTree.forEach(({ key, label, children }) => {
      if (children) {
        children.forEach(({ key: ckey, label: clabel }) => {
          map.set(ckey, clabel);
        });
      } else {
        map.set(key, label);
      }
    });
    return map;
  }, []);

  const menuItems = useMemo(() => generateMenuItems(menuTree), []);

  const logoText = collapsed ? '后台' : '后台管理';

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="md"
        collapsedWidth={isMobile ? 0 : 80}
        trigger={null}
        width={240}
        style={{
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          borderRight: '1px solid #e1e6eb',
          backgroundColor: '#fff',
          transition: 'width 0.3s ease',
          userSelect: 'none',
        }}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        className="bg-base-100"
      >
        <div
          className="text-primary font-extrabold text-xl text-center select-none leading-[64px]"
          style={{
            height: 64,
            margin: 16,
            letterSpacing: '0.05em',
            color: '#1677ff',
          }}
          aria-label="后台管理系统 Logo"
        >
          {logoText}
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          defaultOpenKeys={collapsed ? [] : menuTree.map((item) => item.key)}
          items={menuItems}
          style={{
            borderRight: 0,
            fontSize: 14,
            fontWeight: 500,
            userSelect: 'none',
          }}
          onClick={() => isMobile && setCollapsed(true)}
          role="navigation"
          aria-label="后台导航菜单"
          className="custom-admin-menu"
        />
      </Sider>

      <Layout>
        <Header
          className="flex items-center justify-between px-6 shadow-sm"
          style={{
            height: 64,
            borderBottom: '1px solid #e1e6eb',
            backgroundColor: '#fff',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 20, color: '#1677ff' }}
            aria-label={collapsed ? '展开菜单' : '折叠菜单'}
            className="btn btn-ghost btn-sm"
          />
          <h2
            className="m-0 font-semibold select-none text-primary"
            style={{ fontSize: 18, color: '#222' }}
          >
            {keyLabelMap.get(selectedKey) || '后台管理'}
          </h2>
          <Avatar
            size="large"
            style={{ backgroundColor: '#1677ff', verticalAlign: 'middle' }}
            icon={<UserOutlined />}
            aria-label="用户头像"
          />
          {/* 回到首页 */}
          <Link to="/" className="ml-4">
            <Button type="primary" size="small">
              回到首页
            </Button>
          </Link>
        </Header>

        <Content
          className="p-8 m-6 bg-white rounded-lg shadow-md"
          style={{ minHeight: 280, transition: 'all 0.3s ease' }}
          aria-live="polite"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
