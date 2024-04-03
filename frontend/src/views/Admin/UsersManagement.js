import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UsersManagement.module.css';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/users');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.usersManagement}>
      <h2>Manage Users</h2>
      {/* Render user details here */}
      {/* You can create a table or list to display user details */}
    </div>
  );
};

export default UsersManagement;
