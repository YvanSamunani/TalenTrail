import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null); // Assuming you want to set this in the context

  return (
    <ChatContext.Provider value={{
      chats, setChats,
      currentChat, setCurrentChat,
      messages, setMessages,
      currentUserId, setCurrentUserId // Make sure to provide this setter
    }}>
      {children}
    </ChatContext.Provider>
  );
};
