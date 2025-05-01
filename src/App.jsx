

import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './ChatBot/config.jsx';
import MessageParser from './ChatBot/MessageParser.jsx';
import ActionProvider from './ChatBot/ActionProvider.jsx';
import { Api } from './Api/Api.jsx';

const App = () => {
  const { apiData } = useContext(Api);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'openChatbot') {
        setIsOpen(true);
      } else if (event.data === 'closeChatbot') {
        setIsOpen(false);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className='app'>
      {isOpen && (
        <div className="chatbot-popup">
          <Chatbot
            config={config}
            // messageParser={MessageParser}
            messageParser={(props) => <MessageParser {...props} apiData={apiData} />}
            actionProvider={ActionProvider}
            disableScrollToBottom
          />
        </div>
      )}

      {/* Hide the toggle button if the chatbot is open */}
      {!isOpen && (
        <button className="chatbot-toggle-button" onClick={toggleChatbot}>
          {isOpen ? '×' : '?'}
        </button>
      )}
    </div>
  );
};

export default App;
