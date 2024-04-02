import React from 'react';
import styles from './ContactPage.module.css';
import headerBgImage from '../images/bg-404.jpg';

const ContactPage = () => {
  return (
    <>
      {/* Header Section */}
      <header className={styles.contactHeader}>
       <img src={headerBgImage} alt="Contact" className={styles.headerImage} />
        <div className={styles.headerContent}>
          <h1>Contact</h1>
          <div className={styles.breadcrumb}>
            <a href="/">Home</a> / <span>Contact</span>
          </div>
        </div>
      </header>

      {/* Contact Cards Section */}
      <section className={styles.contactCards}>
        <div className={styles.contactCard}>
          <i className="fas fa-phone"></i>
          <h3>Call Anytime</h3>
          <p>+250 780 689 505</p>
        </div>
        <div className={styles.contactCard}>
          <i className="fas fa-envelope"></i>
          <h3>Send Email</h3>
          <p>info@talentrail.com</p>
        </div>
        <div className={styles.contactCard}>
          <i className="fas fa-map-marker-alt"></i>
          <h3>Address</h3>
          <p>67 KG 14 Ave, Kimironko</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.contactSection}>
        <div className={styles.contactText}>
          <h2>Send a Message</h2>
          <h1>We Always Ready to Hear From You</h1>
          <p>Lorem ipsum dolor sit amet, consect etur adi piscing elit sed do eiusmod.</p>
          {/* Social Media Icons */}
          <div className={styles.socialMedia}>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
        <div className={styles.contactForm}>
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Email Address" />
            <input type="text" placeholder="Phone Number" />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Write message"></textarea>
            <button type="submit">SEND A MESSAGE</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
