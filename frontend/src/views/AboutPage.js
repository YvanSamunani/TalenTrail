import React from 'react';
import styles from './AboutPage.module.css';
import image1 from '../images/about.jpg';
import image2 from '../images/user.png';
import TestimonialCard from '../components/TestimonialCard';
import FactCard from '../components/FactCard';
import headerBgImage from '../images/bg-404.jpg';

const AboutPage = () => {
    const testimonials = [
        {
          quote: "Lorem ipsum is simply free text dolor sit amet, consectetur notted adipisic elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          name: "Kevin Smith",
          title: "Customer",
          image: image2, // Replace with actual path
        },
        {
            quote: "Lorem ipsum is simply free text dolor sit amet, consectetur notted adipisic elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Kevin Smith",
            title: "Customer",
            image: image2, // Replace with actual path
          },
          {
            quote: "Lorem ipsum is simply free text dolor sit amet, consectetur notted adipisic elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Kevin Smith",
            title: "Customer",
            image: image2, // Replace with actual path
          },
      ];
      const facts = [
        {
          number: '6,800',
          description: 'Pro Teachers',
          // Add icon or image if necessary
        },
        {
          number: '9,800',
          description: 'Skill Courses',
          // Add icon or image if necessary
        },
        {
          number: '8,800',
          description: 'Students Enrolled',
          // Add icon or image if necessary
        },
      ];
    
  return (
    <>
      {/* Header Section */}
      <header className={styles.aboutHeader}>
      <img src={headerBgImage} alt="Careers" className={styles.headerImage} />
        <div className={styles.headerContent}>
          <h1>About</h1>
          <div className={styles.breadcrumb}>
            <a href="/">Home</a> / <span>About</span>
          </div>
        </div>
      </header>

      {/* Paragraph Section */}
      <section className={styles.paragraphSection}>
        <div className={styles.paragraphContainer}>
          <h2>About TalenTrail</h2>
          <h3>Your Journey to Success</h3>
          <p>
            At TalenTrail, we believe that every individual has the potential to achieve greatness in their 
            chosen career path. Our mission is to empower individuals with the tools, resources, and guidance
             they need to discover their talents, pursue their passions, and reach their professional goals.
          </p>
          <button className={styles.discoverMoreBtn}>DISCOVER MORE</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsHeader}>
          <h2>Our Testimonials</h2>
          <h3>What They’re Saying?</h3>
          <p>There are many variations of passages of lorem ipsum available but the majority have suffered.</p>
        </div>
        <div className={styles.testimonialsContainer}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>
        {/* Fun Facts Section */}
      <section className={styles.factsSection}>
        <div className={styles.missionStatement}>
          <h2>TalenTrail's Mission is to Polish your skill</h2>
          <p>There are many variations of passages of lore ipsum available but the majority have suffered.</p>
        </div>
        <div className={styles.factsContainer}>
          {facts.map((fact, index) => (
            <FactCard key={index} {...fact} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutPage;
