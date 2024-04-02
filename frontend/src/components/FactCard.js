import React from 'react';
import cardStyles from '../views/AboutPage.module.css'; // Adjust the path as necessary

const FactCard = ({ number, description, icon }) => {
  return (
    <div className={cardStyles.factCard}>
      <i className={`${cardStyles.icon} ${icon}`}></i> {/* If you're using a web font like FontAwesome */}
      {/* If using SVG, you could include it directly or use an img tag */}
      <div className={cardStyles.number}>{number}</div>
      <div className={cardStyles.description}>{description}</div>
    </div>
  );
};

export default FactCard;
