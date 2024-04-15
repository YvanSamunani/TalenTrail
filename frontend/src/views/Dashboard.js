import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardFooter from '../components/DashboardFooter';
import StatsCard from '../components/StatsCard';
import CoursesList from './CoursesList';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [enrolledCoursesCount, setEnrolledCoursesCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3001/enrollments/count', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
      })
      .then(response => response.json())
      .then(data => {
          setEnrolledCoursesCount(data.enrolledCoursesCount);
      })
      .catch(error => {
          console.error('Error fetching enrolled courses count:', error);
      });
    } else {
      console.error("No token found in localStorage.");
    }
  }, []);
  

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <main className={styles.mainContentWithFooter}>
        <div className={styles.mainContent}>
          <h1>Dashboard</h1>
          <div className={styles.statsSection}>
            <div className={styles.statsRow}>
                <StatsCard title="Enrolled Courses" number={enrolledCoursesCount.toString()} color="#4d5fe3" />
                <StatsCard title="Active Courses" number="0" color="#377dff" />
            </div>
            <div className={styles.statsRow}>
                <StatsCard title="Completed Courses" number="0" color="#f3605d" />
                <StatsCard title="Total Students" number="0" color="#5cb85c" />
            </div>
          </div>
          <CoursesList />
        </div>
        <DashboardFooter />
      </main>
    </div>
  );
};

export default Dashboard;
