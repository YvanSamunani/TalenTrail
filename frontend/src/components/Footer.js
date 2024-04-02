// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.footerColumn}>
        <h4>TalenTrail</h4>
          <p>Embark on your journey to success with TalenTrail and unlock endless possibilities for growth, 
            learning, and achievement. Sign up today and take the first step towards a brighter future!</p>
        </div>
        <div className={`${styles.footerColumn} ${styles.quickLinks}`}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/registerpage">Sign Up</Link></li>
            <li><Link to="/survey">Survey</Link></li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>Contact Us</h4>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <i className="fas fa-phone icon"></i>
              <div>
                <h5>Call Anytime</h5>
                <p>+250 780 689 505</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <i className="fas fa-envelope icon"></i>
              <div>
                <h5>Send Email</h5>
                <p>info@talentrail.com</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <i className="fas fa-map-marker-alt icon"></i>
              <div>
                <h5>Visit Office</h5>
                <p>67 KG 14 Ave, Kimironko</p>
              </div>
            </div>
          </div>
          <div className={styles.socialIcons}>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>
      <div className={styles.footerDivision}>
        <p>© Copyright 2024. TalenTrail</p>
      </div>
    </div>
  );
}

export default Footer;