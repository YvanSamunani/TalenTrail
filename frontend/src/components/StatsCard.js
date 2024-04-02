import React from 'react';
import styles from './StatsCard.module.css';

const StatsCard = ({ title, number, color }) => {
  return (
    
    <div className={styles.statsCard} style={{ backgroundColor: color }}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardNumber}>{number}</p>
    </div>
  );
};

export default StatsCard;
