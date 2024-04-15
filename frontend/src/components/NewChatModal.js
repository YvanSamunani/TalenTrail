import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './NewChatModal.module.css';

const NewChatModal = ({ onStartChat }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to fetch users from the server
    const fetchUsers = async () => {
      try {
        // Replace 'http://localhost:3001/chats' with the correct server address if needed
        const response = await axios.get('http://localhost:3000/chats');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Select a user to chat with:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.UserID} onClick={() => onStartChat(user)}>
              {user.FirstName} {user.LastName} {/* Assuming these are the fields in your user records */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewChatModal;
