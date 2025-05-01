import { createChatBotMessage } from 'react-chatbot-kit';
import Options from '../Components/Option';
import '../ChatBot/config.css'; // Import external CSS

const config = {
  botName: "ICSI AI ChatBot",
  initialMessages: [
    createChatBotMessage("Hey, Welcome! I'm here to guide you.", {
      widget: "options",
    }),
  ],
  customComponents: {
    header: () => (
      <div className="chatbot-header">
        <span className="chatbot-title">ICSI AI ChatBot</span>
        <button
          className="chatbot-close-button"
          onClick={() => window.location.reload()}
          title="Close"
        >
          ✖
        </button>
      </div>
    ),
    botAvatar: () => (
      <div className="chatbot-bot-avatar">
        ICSI
      </div>
    ),
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
};

export default config;


