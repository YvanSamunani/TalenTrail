import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import dashboardIcon from '../images/dashboard.png';
import MyProfileIcon from '../images/user.png';
import ProfileIcon from '../images/user1.png';
import WishlistIcon from '../images/wishlist.png';
import EnrolledIcon from '../images/enroll.png';
import ReviewsIcon from '../images/review.png';
import ChatIcon from '../images/chat.png';
import CoursesIcon from '../images/Courses.png';
import AnnouncementsIcon from '../images/announcement.png';
import SettingsIcon from '../images/settings.png';
import LogoutIcon from '../images/logout.png';
import { useAuth } from '../auth/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <>
      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        {/* Toggle icon based on sidebar state */}
        {isOpen ? (
          <i className="fas fa-times"></i> // Close icon
        ) : (
          <i className="fas fa-bars"></i> // Hamburger icon
        )}
      </div>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.profileSection}>
          <div className={styles.userSection}>
            <img src={ProfileIcon} alt="User Icon" className={styles.userIcon} />
            <div className={styles.userName}>{userName}</div>
          </div>
        </div>
        <nav className={styles.navMenu}>
        <a href="/dashboard" className={styles.navItem}>
            <img src={dashboardIcon} alt="Dashboard" className={styles.icon} />
            Dashboard
          </a>
          <a href="/dashboard" className={styles.navItem}>
          <img src={MyProfileIcon} alt="Dashboard" className={styles.icon} />
          My Profile
        </a>
        <a href="/dashboard" className={styles.navItem}>
          <img src={EnrolledIcon} alt="Dashboard" className={styles.icon} />
          Enrolled Courses
        </a>
        <a href="/dashboard" className={styles.navItem}>
          <img src={WishlistIcon} alt="Dashboard" className={styles.icon} />
          Wishlist
        </a>
        <a href="/dashboard" className={styles.navItem}>
          <img src={ReviewsIcon} alt="Dashboard" className={styles.icon} />
          Reviews
        </a>
        <a href="/chatpage" className={styles.navItem}>
          <img src={ChatIcon} alt="Dashboard" className={styles.icon} />
          Chat
        </a>
        <a href="/dashboard" className={styles.navItem}>
          <img src={CoursesIcon} alt="Dashboard" className={styles.icon} />
          My Courses
        </a>
        <a href="/dashboard" className={styles.navItem}>
          <img src={AnnouncementsIcon} alt="Dashboard" className={styles.icon} />
          Announcements
        </a>
          <a href="/settings" className={styles.navItem}>
            <img src={SettingsIcon} alt="Settings" className={styles.icon} />
            Settings
          </a>
          <div className={styles.navItem} onClick={handleLogout}>
            <img src={LogoutIcon} alt="Logout" className={styles.icon} />
            Logout
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
