// import React from 'react';

// const MessageParser = ({ children, actions, apiData }) => {
//   const parse = (message) => {
//     const msg = message.toLowerCase().trim();

//     if (msg === "") {
//       actions.handleMenuResponse("Sorry, I couldn't find that option.");
//       return;
//     }


//     else if(msg.length < 3 ){
//       actions.handleMenuResponse("Please input more than 3 characters..");
//       return;
//     }

//     else{

//     const exactMatch = apiData.find(option => option.Label.toLowerCase() === msg);

//     if (exactMatch) {
//       actions.handleMenuResponse(`${exactMatch.Label}:\n${exactMatch.Description}`);
//       return;
//     }

//     const matchedSubmenu = apiData.filter(option =>
//       msg.split(" ").some(word => option.Label.toLowerCase().includes(word))
//     );

//     if (matchedSubmenu.length > 0) {
//       matchedSubmenu.forEach(option => {
//         actions.handleMenuResponse(`${option.Label}:\n${option.Description}`);
//       });
//     } else {
//       actions.handleMenuResponse("Sorry, I couldn't find that option.");
//     }
//     }

//   };

//   return (
//     <>
//       {React.Children.map(children, (child) =>
//         React.cloneElement(child, { parse, actions })
//       )}
//     </>
//   );
// };

// export default MessageParser;
// import React from 'react';
// import Fuse from 'fuse.js';

// const MessageParser = ({ children, actions, apiData }) => {
//   const fuse = new Fuse(apiData, {
//     keys: ['Label'],
//     threshold: 0.4, // lower = stricter match, higher = looser
//     ignoreLocation: true,
//   });

//   const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/gi, '').trim();

//   const parse = (message) => {
//     const msg = normalize(message);

//     if (msg === "") {
//       actions.handleMenuResponse("Sorry, I couldn't find that option.");
//       return;
//     }

//     if (msg.length < 3) {
//       actions.handleMenuResponse("Please input more than 3 characters.");
//       return;
//     }

//     // Fuzzy search using fuse.js
//     const results = fuse.search(msg);

//     if (results.length > 0) {
//       const topResults = results.slice(0, 3); // limit to top 3 results
//       topResults.forEach(result => {
//         const item = result.item;
//         actions.handleMenuResponse(`${item.Label}:\n${item.Description}`);
//       });
//     } else {
//       actions.handleMenuResponse("Sorry, I couldn't find that option.");
//     }
//   };

//   return (
//     <>
//       {React.Children.map(children, (child) =>
//         React.cloneElement(child, { parse, actions })
//       )}
//     </>
//   );
// };

// export default MessageParser;


import React from 'react';
import Fuse from 'fuse.js';
import './message.css';

const MessageParser = ({ children, actions, apiData }) => {
  const fuse = new Fuse(apiData, {
    keys: ['Label'],
    threshold: 0.4,
    ignoreLocation: true,
  });

  const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/gi, '').trim();

  const parse = (message) => {
    const msg = normalize(message);

    if (msg === "") {
      actions.handleMenuResponse(
        <div className="message-card">
          <div className="message-label">Empty Input</div>
          <div className="message-description">Please enter a valid query.</div>
        </div>
      );
      return;
    }

    if (msg.length < 3) {
      actions.handleMenuResponse(
        <div className="message-card">
          <div className="message-label">Too Short</div>
          <div className="message-description">Please input more than 3 characters.</div>
        </div>
      );
      return;
    }

    const results = fuse.search(msg);

    if (results.length > 0) {
      const topResults = results.slice(0, 3);
      topResults.forEach(result => {
        const item = result.item;

        actions.handleMenuResponse(
          <div className="message-card">
            <div className="message-label">{item.Label}</div>
            <div className="message-description">{item.Description}</div>
          </div>
        );
      });
    } else {
      actions.handleMenuResponse(
        <div className="message-card">
          <div className="message-label">Not Found</div>
          <div className="message-description">Sorry, I couldn't find that option.</div>
        </div>
      );
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
