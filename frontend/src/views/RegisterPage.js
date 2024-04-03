import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import illustration from '../images/register.png';
import { production_url } from '../constants';

const passwordStrengthLevels = {
  0: '',
  1: 'Very weak',
  2: 'Weak',
  3: 'So-so',
  4: 'Good',
  5: 'Great!'
};

const passwordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
};

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMeter, setPasswordMeter] = useState(0);
  const [feedbackMessages, setFeedbackMessages] = useState({
    emailFeedback: '',
    passwordStrengthFeedback: '',
    confirmPasswordFeedback: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === 'password') {
      const strengthLevel = passwordStrength(value);
      setPasswordMeter(strengthLevel);
      setFeedbackMessages((prev) => ({
        ...prev,
        passwordStrengthFeedback: passwordStrengthLevels[strengthLevel],
      }));
    }

    if (name === 'confirmPassword') {
      setFeedbackMessages((prev) => ({
        ...prev,
        confirmPasswordFeedback: value === userData.password ? 'Passwords match' : 'Passwords do not match',
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setFeedbackMessages(prev => ({ ...prev, confirmPasswordFeedback: "Passwords don't match." }));
      return;
    }

    try {
      const response = await axios.post(production_url+'/register', userData);
      navigate('/survey');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFeedbackMessages(prev => ({ ...prev, emailFeedback: 'Email already used' }));
      } else {
        console.error('There was an error!', error);
      }
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.illustrationWrapper}>
        <img src={illustration} alt="Illustration" className={styles.illustration} />
      </div>
      <div className={styles.formWrapper}>
      <h2 className={styles.header}>Register</h2>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" className={styles.inputField} name="firstName" value={userData.firstName} onChange={handleChange} required/>
          <input type="text" placeholder="Last Name" className={styles.inputField} name="lastName" value={userData.lastName} onChange={handleChange} required/>
          <input type="text" placeholder="Username" className={styles.inputField} name="username" value={userData.username} onChange={handleChange} required/>
          <input type="email" placeholder="Email" className={styles.inputField} name="email" value={userData.email} onChange={handleChange} required/>
          <div className={styles.feedbackMessage}>{feedbackMessages.emailFeedback}</div>
          <div className={styles.passwordField}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={styles.inputField}
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <i
              onClick={togglePasswordVisibility}
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.passwordToggleIcon}`}
            />
          </div>
          <div className={styles.feedbackMessage}>{feedbackMessages.passwordStrengthFeedback}</div>
          <div className={styles.passwordField}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className={styles.inputField}
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
            <i
              onClick={toggleConfirmPasswordVisibility}
              className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} ${styles.passwordToggleIcon}`}
            />
          </div>
          <div className={styles.feedbackMessage}>{feedbackMessages.confirmPasswordFeedback}</div>
          <button type="submit" className={styles.registerButton}>Register</button>
        </form>
        <p className={styles.loginPrompt}>
          Already a member? <a href="./signin" className={styles.loginLink}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
