import React from 'react';
import styles from './TestimonialCard.module.css';

const TestimonialCard = ({ quote, name, title, image }) => {
  return (
    <div className={styles.card}>
      <p className={styles.quote}>{quote}</p>
      <div className={styles.authorInfo}>
        <img src={image} alt={name} className={styles.authorImage} />
        <div>
          <h4 className={styles.authorName}>{name}</h4>
          <p className={styles.authorTitle}>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
