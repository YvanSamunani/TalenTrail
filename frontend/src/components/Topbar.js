import React from 'react';
import styles from './Topbar.module.css'; // Ensure CSS file is created

const Topbar = () => {
  return (
    <header className={styles.topbar}>
      <nav>
        {/* Add navigation links here */}
        <a href="/dashboard" className={styles.navLink}>Dashboard</a>
        <a href="/about" className={styles.navLink}>About</a>
        {/* ... other nav links ... */}
      </nav>
    </header>
  );
};

export default Topbar;
