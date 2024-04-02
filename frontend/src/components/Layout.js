import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  const noFooterRoutes = ['/dashboard']; // Add more paths here if needed
  const showFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <div>
      <Navbar />
        {children}
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;