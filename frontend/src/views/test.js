import React, { useState, useEffect } from 'react';
import styles from './Survey.module.css';

function Survey() {
  const [educationLevels, setEducationLevels] = useState([]);
  const [fieldsOfStudy, setFieldsOfStudy] = useState([]);
  const [skills, setSkills] = useState([]);
  const [schools, setSchools] = useState([]);
  const [careers, setCareers] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({
    educationLevelId: '',
    fieldOfStudyId: '',
    skills: [],
    schoolId: '',
    desiredCareerId: '',
    industryId: ''
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch the user's ID from local storage or context/state management after registration
    setUserId(localStorage.getItem('userId'));
    
    // Fetch all necessary data for the survey
    const fetchData = async (endpoint) => {
      try {
        const response = await fetch(`http://localhost:5000/${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    const loadData = async () => {
      setEducationLevels(await fetchData('levelsofeducation'));
      setFieldsOfStudy(await fetchData('fieldsofstudy'));
      setSkills(await fetchData('skills'));
      setSchools(await fetchData('schools'));
      setCareers(await fetchData('careers'));
      setIndustries(await fetchData('careers')); // Assuming industries are in the careers table, adjust if otherwise
    };

    loadData();
  }, []);

  // Function to handle the changes of the dropdowns
  const handleSelectionChange = (e) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      // For a multiple select, gather all the selected values
      const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
      setSelectedAnswers(prevState => ({ ...prevState, [name]: selectedOptions }));
    } else {
      setSelectedAnswers(prevState => ({ ...prevState, [name]: value }));
    }
  };
  

  // Function to go to the next phase
  const handleNext = () => {
    if (currentPhase < 3) setCurrentPhase(currentPhase + 1);
  };

  // Function to go back to the previous phase
  const handlePrev = () => {
    if (currentPhase > 1) setCurrentPhase(currentPhase - 1);
  };

  // Function to handle survey submission
  // Function to handle survey submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construct the survey data to send
    const surveyData = {
      userId,
      educationLevelId: selectedAnswers.educationLevelId,
      fieldOfStudyId: selectedAnswers.fieldOfStudyId,
      schoolId: selectedAnswers.schoolId,
      skills: selectedAnswers.skills,
      desiredCareerId: selectedAnswers.desiredCareerId,
      industryId: selectedAnswers.industryId,
    };

    try {
      const response = await fetch('http://localhost:5000/submit-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      // Here you could redirect the user to another page or clear the form, etc.
      console.log('Survey submitted successfully');
      // Reset the survey form or redirect the user to a confirmation page
    } catch (error) {
      console.error('Failed to submit survey:', error);
      // Display an error message to the user
    }
  };

  return (
    <div className={styles.surveyContainer}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div className={`${styles.progressIndicator} ${currentPhase >= 1 ? styles.active : ''}`}>1</div>
        <div className={`${styles.progressIndicator} ${currentPhase >= 2 ? styles.active : ''}`}>2</div>
        <div className={`${styles.progressIndicator} ${currentPhase === 3 ? styles.active : ''}`}>3</div>
      </div>

      <h2>Personalize Your Experience</h2>
      <form onSubmit={handleSubmit}>
        {/* Conditional rendering of survey content based on current phase */}
        {currentPhase === 1 && (
          <>
            <h3>Academic Background</h3>
            <label htmlFor="educationLevel" className={styles.questionLabel}>
              What is your level of education?
            </label>
            <select
              id="educationLevel"
              name="educationLevelId"
              className={styles.formSelect}
              onChange={handleSelectionChange}
              value={selectedAnswers.educationLevelId}
            >
              {educationLevels.map((level) => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </select>

            <label htmlFor="fieldOfStudy" className={styles.questionLabel}>
              What field of study are you pursuing or have pursued?
            </label>
            <select
              id="fieldOfStudy"
              name="fieldOfStudyId"
              className={styles.formSelect}
              onChange={handleSelectionChange}
              value={selectedAnswers.fieldOfStudyId}
            >
              {fieldsOfStudy.map((field) => (
                <option key={field.id} value={field.id}>{field.name}</option>
              ))}
            </select>

            <label htmlFor="school" className={styles.questionLabel}>
              Which school do you go to?
            </label>
            <select
              id="school"
              name="schoolId"
              className={styles.formSelect}
              onChange={handleSelectionChange}
              value={selectedAnswers.schoolId}
            >
              {schools.map((school) => (
                <option key={school.id} value={school.id}>{school.name}</option>
              ))}
            </select>
          </>
        )}
    
        {currentPhase === 2 && (
          <>
            <h3>Skills and Experience</h3>
            <label htmlFor="skills" className={styles.questionLabel}>
              Which skills do you possess?
            </label>
            <select
              id="skills"
              name="skills"
              multiple
              className={styles.formSelect}
              onChange={handleSelectionChange}
              value={selectedAnswers.skills}
            >
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>{skill.name}</option>
              ))}
            </select>
    
            <label htmlFor="experience" className={styles.questionLabel}>
              How many years of work or volunteer experience do you have?
            </label>
            <select
              id="experience"
              name="experience"
              className={styles.formSelect}
              onChange={handleSelectionChange}
              value={selectedAnswers.experience}
            >
              <option value="1-2">1-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5 years +</option>
            </select>
          </>
        )}
    
        {currentPhase === 3 && (
          <>
            <h3>Career Aspirations</h3>
            <label htmlFor="career" className={styles.questionLabel}>
              What career are you aspiring to pursue?
            </label>
            <select
              id="career"
              name="desiredCareerId"
              className={styles.formSelect}
              onChange={handleSelectionChange}
              value={selectedAnswers.desiredCareerId}
            >
              {careers.map((career) => (
                <option key={career.id} value={career.id}>{career.name}</option>
              ))}
            </select>
    
            <label htmlFor="industry" className={styles.questionLabel}>
              Which industry or industries are you interested in?
            </label>
            <select
              id="industry"
              name="industryId"
              className={styles.formSelect}
              onChange={handleSelectionChange}
              value={selectedAnswers.industryId}
            >
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>{industry.name}</option>
              ))}
            </select>
          </>
        )}
    
        <div className={styles.formNavigation}>
          {currentPhase > 1 && (
            <button type="button" className={styles.prevButton} onClick={handlePrev}>
              Prev
            </button>
          )}
          {currentPhase < 3 ? (
            <button type="button" className={styles.nextButton} onClick={handleNext}>
              Next
            </button>
          ) : (
            <button type="submit" className={styles.submitButton}>
              Submit Survey
            </button>
          )}
        </div>
      </form>
    </div>
    );
}

export default Survey;
