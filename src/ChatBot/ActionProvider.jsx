
import React from 'react';
const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const updateState = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleMenuResponse = (text) => {
    const message = createChatBotMessage(text);
    updateState(message);
  };

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          actions: {
            handleMenuResponse,
          },
        })
      )}
    </>
  );
};

export default ActionProvider;
