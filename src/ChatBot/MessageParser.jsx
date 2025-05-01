import React from 'react';

const MessageParser = ({ children, actions, apiData }) => {
  const parse = (message) => {
    const msg = message.toLowerCase().trim();

    if (msg === "") {
      actions.handleMenuResponse("Sorry, I couldn't find that option.");
      return;
    }
    

    else if(msg.length < 3 ){
      actions.handleMenuResponse("Please input more than 3 characters..");
      return;
    }
  
    else{
     
    const exactMatch = apiData.find(option => option.Label.toLowerCase() === msg);
    
    if (exactMatch) {
      actions.handleMenuResponse(`${exactMatch.Label}:\n${exactMatch.Description}`);
      return;
    }
    
    const matchedSubmenu = apiData.filter(option =>
      msg.split(" ").some(word => option.Label.toLowerCase().includes(word))
    );
    
    if (matchedSubmenu.length > 0) {
      matchedSubmenu.forEach(option => {
        actions.handleMenuResponse(`${option.Label}:\n${option.Description}`);
      });
    } else {
      actions.handleMenuResponse("Sorry, I couldn't find that option.");
    }
    }

  };

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { parse, actions })
      )}
    </>
  );
};

export default MessageParser;
