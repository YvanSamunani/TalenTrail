import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../images/logo-no-background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className={`${styles.navbar} ${scroll ? styles.shadow : ''}`}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="TalenTrail Logo" className={styles.navLogo} />
        </Link>
        <button className={styles.navToggler} onClick={handleNavCollapse}>
          <FontAwesomeIcon icon={isNavCollapsed ? faBars : faTimes} />
        </button>
        <div className={`${styles.navCollapse} ${isNavCollapsed ? '' : styles.show}`}>
          <ul className={styles.navList}>
            <li className="nav-item">
              <Link className={styles.navLink} to="/dashboard">Dashboard</Link>
            </li>

            <li className="nav-item">
              <Link className={styles.navLink} to="/">Home</Link>
            </li>

            {/* <li className="nav-item">
              <Link className={styles.navLink} to="/survey">Survey</Link>
            </li> */}

            <li className="nav-item">
              <Link className={styles.navLink} to="/about">About</Link>
            </li>

            <li className="nav-item">
              <Link className={styles.navLink} to="/courses">All Courses</Link>
            </li>

            <li className="nav-item">
              <Link className={styles.navLink} to="/careers">Careers</Link>
            </li>
            
            <li className="nav-item">
              <Link className={styles.navLink} to="/signin">Sign In</Link>
            </li>

            <li className="nav-item">
              <Link className={styles.navLink} to="/registerpage">Register</Link>
            </li>

            <li className="nav-item">
              <Link className={styles.navLink} to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
