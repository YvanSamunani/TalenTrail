import React from 'react';
import styles from './Careers.module.css';
import logo from '../images/icon1.png';
import logo1 from '../images/BK.png';
import logo2 from '../images/Inkomoko.png';
import logo3 from '../images/MTN.png';
import logo4 from '../images/JiR.png';
import headerBgImage from '../images/bg-404.jpg'; // Replace with the actual path to the header background image

const jobOpportunities = [
    {
      id: 1,
      type: 'FULL TIME',
      title: 'Digital Designer',
      company: 'Bank of Kigali',
      location: 'Gasabo, Kigali',
      logo: logo1, 
      deadline: 'Application Deadline: June 30, 2024',
      link: 'https://example.com/apply'
    },
    {
      id: 1,
      type: 'PART TIME',
      title: 'Digital Designer',
      company: 'Inkomoko',
      location: 'Remera, Kigali',
      logo: logo2, 
      deadline: 'Application Deadline: June 30, 2024',
      link: 'https://example.com/apply'
    },
    {
      id: 1,
      type: 'FULL TIME',
      title: 'Digital Designer',
      company: 'MTN',
      location: 'Gasabo, Kigali',
      logo: logo3,
      deadline: 'Application Deadline: June 30, 2024',
      link: 'https://example.com/apply'
    },
    {
      id: 1,
      type: 'PART TIME',
      title: 'Digital Designer',
      company: 'Job in Rwanda',
      location: 'Nyarugenge, Kigali',
      logo: logo4,
      deadline: 'Application Deadline: June 30, 2024',
      link: 'https://example.com/apply'
    },
    {
      id: 1,
      type: 'PART TIME',
      title: 'Digital Designer',
      company: 'MTN',
      location: 'Kacyiru, Kigali',
      logo: logo3,
      deadline: 'Application Deadline: June 30, 2024',
      link: 'https://example.com/apply'
    },
    // ... more job opportunities
  ];
const CareersPage = () => {
  return (
    <>
      <header className={styles.careersHeader}>
        <img src={headerBgImage} alt="Careers" className={styles.headerImage} />
        <div className={styles.headerContent}>
          <h1>Careers</h1>
          <div className={styles.breadcrumb}>
            <a href="/">Home</a> / <span>Careers</span>
          </div>
        </div>
      </header>

      <div className={styles.pageContent}>
        <div className={styles.mainContent}>
          <div className={styles.opportunities}>
            {jobOpportunities.map((job) => (
              <div key={job.id} className={styles.opportunityCard}>
                <img src={job.logo} alt={job.title} className={styles.companyLogo} />
                <div className={styles.opportunityInfo}>
                  <span className={styles.jobType}>{job.type}</span>
                  <h5 className={styles.jobTitle}>{job.title}</h5>
                  <p className={styles.companyName}>{job.company}</p>
                  <p className={styles.location}>{job.location}</p>
                </div>
                <div className={styles.applicationDetails}>
                    <p className={styles.applicationDeadline}>{job.deadline}</p>
                    <a href={job.link} className={styles.applicationLink}>Apply Now</a>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.sidebar}>
          <ul className={styles.sidebarMenu}>
          <li className={styles.sidebarMenuItem}><a href="#dashboard">Dashboard</a></li>
          <li className={styles.sidebarMenuItem}><a href="#home">Home</a></li>
          <li className={styles.sidebarMenuItem}><a href="#about">About</a></li>
          <li className={styles.sidebarMenuItem}><a href="#all-courses">All Courses</a></li>
          <li className={styles.sidebarMenuItem}><a href="#careers" className="active">Careers</a></li>
          <li className={styles.sidebarMenuItem}><a href="#contact">Contact</a></li>
        </ul>
        <div className={styles.helpCard}>
          <h3>Need Help?</h3>
          <p>Speak with a human to filling out a form? Call corporate office and we will connect you with a team member who can help.</p>
          <a href="#read-more">READ MORE</a>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareersPage;
