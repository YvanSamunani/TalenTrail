import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import UsersManagement from './UsersManagement';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.adminDashboard}>
      <Navbar />
      <Sidebar />
      <div className={styles.mainContent}>
        <UsersManagement />
        {/* Add other management components as needed */}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
