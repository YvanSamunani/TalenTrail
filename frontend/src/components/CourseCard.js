import React from 'react';
import styles from './CourseCard.module.css';


const CourseCard = ({ title, instructor, image, rating, price, level, onEnroll }) => {


  // Helper function to render stars
const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className={styles.fullStar}>★</span>); // Filled star
      } else {
        stars.push(<span key={i} className={styles.emptyStar}>☆</span>); // Empty star
      }
    }
    return stars;
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p className={styles.instructor}>{instructor}</p>
        <div className={styles.rating}>{renderStars(rating)}</div>
        <p className={styles.price}>{price}</p>
        <p className={styles.level}>{level}</p>
        <button className={styles.enrollButton} onClick={onEnroll}>GET ENROLLED</button>
      </div>
    </div>
  );
};

export default CourseCard;
