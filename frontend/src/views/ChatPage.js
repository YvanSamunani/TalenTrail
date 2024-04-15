import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardFooter from '../components/DashboardFooter';
import ChatList from '../components/ChatList';
import ChatBox from '../components/ChatBox';
import NewChatModal from '../components/NewChatModal'; // Component to select a user to chat with
import { ChatProvider } from '../components/ChatContext';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleNewChat = () => {
    // Function to handle the New Chat button action
    setModalOpen(true);
  };

  const handleStartChat = (user) => {
    // Function to start a new chat with the selected user
    // This is where you would initialize a chat session with the user
    // For now, let's close the modal
    setModalOpen(false);
    // Further actions like setting the current chat in context would go here
  };

  return (
    <ChatProvider>
      <div className={styles.chatPage}>
        <Sidebar />
        <div className={styles.chatMain}>
          {/* Chat header */}
          <div className={styles.chatHeader}>
            <h1 className={styles.chatTitle}>Chats</h1>
            <button className={styles.newChatButton} onClick={handleNewChat}>
              + New Chat
            </button>
          </div>
          {/* Chat columns */}
          <div className={styles.chatColumns}>
            <ChatList />
            <ChatBox />
          </div>
          <DashboardFooter />
        </div>
      </div>
      {isModalOpen && <NewChatModal onStartChat={handleStartChat} />}
    </ChatProvider>
  );
};

export default ChatPage;
