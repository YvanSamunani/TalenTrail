import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import { useNavigate } from 'react-router-dom'; // To redirect after successful login
import { useAuth } from '../auth/AuthContext'; // Import useAuth hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './SignIn.module.css';
import { production_url } from '../constants';
import { development_url } from '../constants';

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(''); // State to store login error message
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login from useAuth

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value,
    }));
    setLoginError(''); // Reset login error message on input change
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(development_url + '/login', credentials);
  
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('userName', response.data.userName);
        localStorage.setItem('userId', response.data.userId);
        login();
        navigate('/dashboard');
      } else {
        setLoginError(response.data.message || 'Invalid username or password.');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError('Login failed due to server error.');
      }
    }
  };
  


  return (
    <div className={styles.signInContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.header}>Sign In</h2>
        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.inputField}
            value={credentials.username}
            onChange={handleChange}
          />
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={styles.inputField}
              value={credentials.password}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className={styles.eyeIcon}
            />
          </div>
          {loginError && <div className={styles.loginError}>{loginError}</div>}
          <button type="submit" className={styles.signInButton}>LOGIN</button>
        </form>
        <div className={styles.options}>
          <a href="#" className={styles.optionLink}>Lost your password?</a>
          <p>Don't have an account <a href="./RegisterPage" className={styles.optionLink}>Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

           
