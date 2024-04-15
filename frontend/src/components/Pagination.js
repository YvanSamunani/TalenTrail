import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ coursesPerPage, totalCourses, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul>
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? styles.disabled : ''}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        </li>
        {pageNumbers.map(number => (
        <li key={number}>
            <button
            onClick={() => paginate(number)}
            className={`${styles.paginationButton} ${currentPage === number ? styles.active : ''}`}
            >
            {number}
            </button>

        </li>
        ))}

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className={currentPage === pageNumbers.length ? styles.disabled : ''}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
