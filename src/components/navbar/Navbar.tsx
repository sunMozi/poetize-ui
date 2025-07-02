import React, { useState } from 'react';
import DesktopNav from './DesktopNav';
import MobileDrawer from './MobileDrawer';

interface NavbarProps {
  show: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ show }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div
        className={`sticky top-0 z-50 shadow-md navbar bg-base-200 transform transition-transform duration-300 ${
          show ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <DesktopNav onDrawerToggle={() => setDrawerOpen(!drawerOpen)} />
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
