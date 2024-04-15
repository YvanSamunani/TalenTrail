import React, { useState, useEffect } from 'react';
import styles from './AllCourses.module.css';
import headerBgImage from '../images/bg-404.jpg';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination'; 
import courseImage from '../images/course-bgd.svg';

const AllCoursesPage = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterCategory, setFilterCategory] = useState([]);
    const [filterLevel, setFilterLevel] = useState([]);
    const [filterPrice, setFilterPrice] = useState([]);
    const coursesPerPage = 10;

    // Calculate total pages every time filteredCourses or coursesPerPage changes
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    // Function to change the current page
    const paginate = (pageNumber) => setCurrentPage(pageNumber); 

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        fetch('http://localhost:5000/courses')
            .then(response => response.json())
            .then(data => {
                setCourses(data);
                setFilteredCourses(data);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    useEffect(() => {
        const applyFilters = () => {
            const filtered = courses.filter(course => 
                (filterCategory.length === 0 || filterCategory.includes(course.Category)) &&
                (filterLevel.length === 0 || filterLevel.includes(course.Level)) &&
                (filterPrice.length === 0 || (filterPrice.includes('Free') && course.Price === 0) || (filterPrice.includes('Paid') && course.Price > 0))
            );
            setFilteredCourses(filtered);
        };

        applyFilters();
    }, [courses, filterCategory, filterLevel, filterPrice]);

    useEffect(() => {
        if (currentPage > totalPages && totalPages !== 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        const newCategories = filterCategory.includes(value) ? 
          filterCategory.filter(item => item !== value) : 
          [...filterCategory, value];
        setFilterCategory(newCategories);
    };

    const handleLevelChange = (event) => {
        const value = event.target.value;
        const newLevels = filterLevel.includes(value) ? 
          filterLevel.filter(item => item !== value) : 
          [...filterLevel, value];
        setFilterLevel(newLevels);
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        const newPrices = filterPrice.includes(value) ? 
          filterPrice.filter(item => item !== value) : 
          [...filterPrice, value];
        setFilterPrice(newPrices);
    };

    const clearFilters = () => {
        setFilterCategory([]);
        setFilterLevel([]);
        setFilterPrice([]);
    };

    const handleEnrollment = (courseId) => {
        const userId = localStorage.getItem('userId');
        fetch('http://localhost:5000/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, courseId })
        })
        .then(response => response.json())
        .then(data => {
            alert('Enrollment Successful'); // Or update the UI to reflect the change
        })
        .catch(error => {
            console.error('Error enrolling in course:', error);
        });
    };

    

    return (
        <>
            <header className={styles.coursesHeader}>
                <img src={headerBgImage} alt="Courses" className={styles.headerImage} />
                <div className={styles.headerContent}>
                    <h1>All Courses</h1>
                    <div className={styles.breadcrumb}>
                        <a href="/">Home</a> / <span>All Courses</span>
                    </div>
                </div>
            </header>
            <div className={styles.mainContent}>
                <button onClick={toggleSidebar} className={`${styles.menuButton} ${isSidebarVisible ? styles.hide : ''}`}>
                    {isSidebarVisible ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                </button>
                <aside className={styles.sidebar}>
                    <input type="text" placeholder="Search..." className={styles.searchInput} />
                    
                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Category</h3>
                        <label><input type="checkbox" name="category" value="Art & Design" checked={filterCategory.includes('Art & Design')} onChange={handleCategoryChange} /> Art & Design</label>
                        <label><input type="checkbox" name="category" value="Business" checked={filterCategory.includes('Business')} onChange={handleCategoryChange} /> Business</label>
                        <label><input type="checkbox" name="category" value="Lifestyle" checked={filterCategory.includes('Lifestyle')} onChange={handleCategoryChange} /> Lifestyle</label>
                        <label><input type="checkbox" name="category" value="Marketing" checked={filterCategory.includes('Marketing')} onChange={handleCategoryChange} /> Marketing</label>
                        <label><input type="checkbox" name="category" value="Photography" checked={filterCategory.includes('Photography')} onChange={handleCategoryChange} /> Photography</label>
                    </div>

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Level</h3>
                        <label><input type="checkbox" name="level" value="Beginner" checked={filterLevel.includes('Beginner')} onChange={handleLevelChange} /> Beginner</label>
                        <label><input type="checkbox" name="level" value="Intermediate" checked={filterLevel.includes('Intermediate')} onChange={handleLevelChange} /> Intermediate</label>
                        <label><input type="checkbox" name="level" value="Expert" checked={filterLevel.includes('Expert')} onChange={handleLevelChange} /> Expert</label>
                    </div>

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Price</h3>
                        <label><input type="checkbox" name="price" value="Free" checked={filterPrice.includes('Free')} onChange={handlePriceChange} /> Free</label>
                        <label><input type="checkbox" name="price" value="Paid" checked={filterPrice.includes('Paid')} onChange={handlePriceChange} /> Paid</label>
                    </div>
                    
                    <button className={styles.clearFilterBtn} onClick={clearFilters}>Clear All Filters</button>
                </aside>
                <main className={styles.courseGrid}>
                    {currentCourses.map(course => (
                         <CourseCard
                         key={course.CourseID}
                         title={course.CourseName}
                         instructor={course.Instructor}
                         image={courseImage}
                         rating={course.Rating}
                         price={course.Price === 0 ? 'Free' : `RWF ${course.Price}`}
                         level={course.Level}
                         onEnroll={() => handleEnrollment(course.CourseID)}
                     />
                    ))}
                </main>
                {totalPages > 1 && (
                    <div className={styles.paginationWrapper}>
                        <Pagination
                            coursesPerPage={coursesPerPage}
                            totalCourses={filteredCourses.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default AllCoursesPage;
