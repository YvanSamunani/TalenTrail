import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardFooter from '../components/DashboardFooter';
import StatsCard from '../components/StatsCard';
import CoursesList from './CoursesList';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <main className={styles.mainContentWithFooter}>
      <div className={styles.mainContent}>
        <h1>Dashboard</h1>
        <div className={styles.statsSection}>
            <div className={styles.statsRow}>
                <StatsCard title="Enrolled Courses" number="9" color="#4d5fe3" />
                <StatsCard title="Active Courses" number="9" color="#377dff" />
            </div>
            <div className={styles.statsRow}>
                <StatsCard title="Completed Courses" number="0" color="#f3605d" />
                <StatsCard title="Total Students" number="37" color="#5cb85c" />
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
