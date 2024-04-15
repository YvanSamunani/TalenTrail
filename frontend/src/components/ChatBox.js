import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useChat } from './ChatContext';
import styles from './ChatBox.module.css';

const ChatBox = () => {
  const {
    currentChat, setCurrentChat,
    messages, setMessages,
    currentUserId, setCurrentUserId
  } = useChat(); // Retrieve currentUserId from context
  const [newMessage, setNewMessage] = useState('');

  // Define fetchMessages function outside of useEffect to use it in multiple places
  const fetchMessages = async () => {
    if (currentChat && currentUserId) { // Ensure that both currentChat and currentUserId are available
      try {
        const response = await axios.get(`http://localhost:5000/messages/${currentUserId}/${currentChat.receiver_id}`);

        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  // Check if the user ID is being stored and retrieved correctly
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setCurrentUserId(userId);
    } else {
      console.log("No user ID found in local storage");
    }
  }, []);

    const handleChatClick = (chat) => {
      setCurrentChat(chat); // Make sure 'chat' object has 'receiver_id' property
      fetchMessages();
    };
  

  useEffect(() => {
    // Call fetchMessages initially and whenever the dependencies change
    fetchMessages();
  }, [currentChat, currentUserId]); // Add currentUserId as a dependency

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Log the data being sent to check if all fields are correctly populated
    console.log("Sending message with:", {
      sender_id: currentUserId,
      receiver_id: currentChat.receiver_id,
      message: newMessage
    });

    try {
      await axios.post('http://localhost:5000/message', {
        sender_id: currentUserId, // Ensure this is not undefined
        receiver_id: currentChat.receiver_id, // Ensure this is not undefined
        message: newMessage // Ensure this is not an empty string
      });
      setNewMessage('');
      fetchMessages(); // Refresh messages list
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  if (!currentChat) return <div className={styles.chatBox}>Please select a chat</div>;

  return (
    <div className={styles.chatBox}>
      <div className={styles.chatInterfaceHeader}>
        <div className={styles.userInfo}>
          <img src={currentChat.avatar} alt="Avatar" className={styles.userAvatar} />
          <span className={styles.userName}>{currentChat.name}</span>
          <span className={styles.userStatus}>Active</span>
        </div>
        <div className={styles.chatActions}>
          <span className={styles.actionIcon}>🔍</span>
          <span className={styles.actionIcon}>📞</span>
          <span className={styles.actionIcon}>✖️</span>
        </div>
      </div>
      <div className={styles.messageList}>
      {messages.map((msg, index) => (
        <div key={index} className={parseInt(msg.sender_id, 10) === parseInt(currentUserId, 10) ? `${styles.messageItem} ${styles.myMessage}` : `${styles.messageItem} ${styles.theirMessage}`}>
          {msg.message}
        </div>
      ))}

      </div>

      <form className={styles.sendMessageForm} onSubmit={handleSendMessage}>
        <input className={styles.messageInput} type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Write message" />
        <button className={styles.sendButton} type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
