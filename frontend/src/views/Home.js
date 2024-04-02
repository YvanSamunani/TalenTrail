import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Home.module.css';
import firstSlide from '../images/img2.jpg';
import firstCardImage from '../images/img11.jpg';
import secondCardImage from '../images/img9.jpg';
import thirdCardImage from '../images/img8.jpg';
import featureImage from '../images/img2.jpg';
import iconLearn from '../images/icon1.png'; // Replace with actual icon paths
import iconTeach from '../images/icon1.png';
import iconCertify from '../images/icon1.png';


function Home() {
  return (
    <div className="container mt-5">
      <h1 className={styles.header}>Welcome to TalenTrail: Your Pathway to Success</h1>
      <p>At TalenTrail, we believe that every individual has the potential to achieve greatness in their 
        chosen career path. Our mission is to empower individuals with the tools, resources, 
        and guidance they need to discover their talents, pursue their passions, and reach their professional goals.</p>
      
      <div className={styles.featureSection}>
        <div className={styles.featureText}>
          <h2 className={styles.header}>Discover Your Path</h2>
          <p>Explore various career options to find what truly suits your passion and skills. 
            Embark on a journey of self-discovery and unlock your potential with TalenTrail.TalenTrail
             offers a wide range of services designed to empower individuals and organizations in their 
             career development journeys. Whether you're a student exploring future career options, 
             a professional seeking new opportunities, or an employer looking to attract top talent, TalenTrail has you covered.</p>
        </div>
        <img src={featureImage} alt="Feature" className={styles.featureImage} />
      </div>

      {/* Feature Icons */}
      <div className={styles.featureIcons}>
        {/* Icon 1 */}
        <div className={styles.featureCard}>
          <img src={iconLearn} alt="Learn Skills" className={styles.featureIcon} />
          <div className={styles.featureText}>
            <h3>Learn Skills</h3>
            <p>with unlimited courses</p>
          </div>
        </div>
        {/* Icon 2 */}
        <div className={styles.featureCard}>
          <img src={iconTeach} alt="Expert Teachers" className={styles.featureIcon} />
          <div className={styles.featureText}>
            <h3>Expert Teachers</h3>
            <p>Best & highly qualified</p>
          </div>
        </div>
        {/* Icon 3 */}
        <div className={styles.featureCard}>
          <img src={iconCertify} alt="Certificates" className={styles.featureIcon} />
          <div className={styles.featureText}>
            <h3>Certificates</h3>
            <p>value all over the world</p>
          </div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoText}>
          <h2>Welcome to the Online Learning Center</h2>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, simply free text by injected humour.</p>
          <ul className={styles.infoList}>
            <li>Get unlimited access to 66000+ of our top courses</li>
            <li>Explore a variety of fresh educational topics</li>
            <li>Find the best qualified teacher for you</li>
            <li>Transform access to education</li>
          </ul>
          <button className={styles.viewCoursesButton}>VIEW ALL COURSES</button>
        </div>
        <div className={styles.infoImage}>
          <img src={firstSlide} alt="Online Learning" />
        </div>
      </div>

      {/* Our Services Heading */}
      <h2 className={styles.ourServicesHeading}>Our Services</h2> {/* Apply the teal color style */}
      
      {/* Cards */}
      <div className={`row row-cols-1 row-cols-md-3 g-4 ${styles.cardRow}`}>
        <div className="col">
          <div className="card">
            <img src={firstCardImage} className={`${styles.cardImg} card-img-top`} alt="Card cap" />
            <div className="card-body">
            <h5 className={`${styles.cardTitle}`}>My Career Path</h5>
              <p className="card-text">Embark on a journey of self-discovery and career exploration with My Career Path.</p>
              <button className={styles.cardButton}>Learn More</button> {/* Button added */}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src={secondCardImage} className={`${styles.cardImg} card-img-top`}  alt="Card cap" />
            <div className="card-body">
            <h5 className={`${styles.cardTitle}`}>Learn and Grow</h5>
              <p className="card-text">Invest in your personal and professional development with Learn and Grow.</p>
              <button className={styles.cardButton}>Learn More</button> {/* Button added */}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <img src={thirdCardImage} className={`${styles.cardImg} card-img-top`} alt="Card cap" />
            <div className="card-body">
            <h5 className={`${styles.cardTitle}`}>Connect with Experts</h5>
              <p className="card-text">Forge meaningful connections and gain insights through Connect with Experts.</p>
              <button className={styles.cardButton}>Learn More</button> {/* Button added */}
            </div>
          </div>
        </div>
        {/* Additional cards omitted for brevity */}
      </div>
    </div>
  );
}

export default Home;
