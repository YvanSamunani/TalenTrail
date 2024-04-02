import React from 'react';
import styles from './CoursesList.module.css'; // Ensure CSS file is created

const CoursesList = () => {
  // Assume courseData is an array of course information
  const courseData = []; // Populate with your data
  
  return (
    <div className={styles.coursesList}>
      <h2>Most Popular Courses</h2>
      <table>
        {/* Table headers */}
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Enrolled</th>
            <th>Status</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {courseData.map((course, index) => (
            <tr key={index}>
              <td>{course.name}</td>
              <td>{course.enrolled}</td>
              <td className={styles[course.status.toLowerCase()]}>{course.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesList;
