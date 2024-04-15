import React, { useEffect } from 'react';
import axios from 'axios';
import { useChat } from './ChatContext';
import styles from './ChatList.module.css';

const ChatList = () => {
  const { chats, setChats, setCurrentChat, setMessages, currentUserId } = useChat();

  useEffect(() => {
    const fetchChats = async () => {
      if (currentUserId) {  // Ensure there's a user ID to fetch chats for
        try {
          const response = await axios.get(`http://localhost:3001/chats?userId=${currentUserId}`);
          setChats(response.data);
        } catch (error) {
          console.error('Error fetching chats:', error);
        }
      }
    };

    fetchChats();
  }, [setChats, currentUserId]);  // Ensure fetchChats runs when currentUserId is set

  // Define fetchMessages within ChatList
  const fetchMessages = async (chat) => {
    try {
      const response = await axios.get(`http://localhost:3001/messages/${currentUserId}/${chat.receiver_id}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages for chat:', error);
    }
  };

  const handleChatClick = async (chat) => {
    const updatedChat = {
      ...chat,
      receiver_id: chat.UserID  // Standardize property name to 'receiver_id'
    };
    setCurrentChat(updatedChat);
    fetchMessages(updatedChat);  // Pass the updated chat to fetchMessages
  };

  return (
    <div className={styles.chatListContainer}>
      <div className={styles.chatListHeader}>
        Inbox <span className={styles.newMessageIndicator}>3 New</span>
      </div>
      {chats.map((chat) => (
        <div key={chat.UserID} className={styles.chatListItem} onClick={() => handleChatClick(chat)}>
          <div className={styles.userAvatar}>{chat.FirstName.charAt(0)}</div>
          <div className={styles.chatPreview}>
            <div className={styles.userName}>{chat.FirstName} {chat.LastName}</div>
            <div className={styles.lastMessagePreview}>Last message...</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
