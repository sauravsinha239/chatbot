
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
            {/* <div className="message-description">{item.Description}</div> */}
            <div className="message-description">
              {item.Description.split('\n')
                .map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  const urlRegex = /https?:\/\/[^\s]+/g;
                  const formattedLine = trimmed.replace(urlRegex, (url) =>
                    `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
                  );
                  return (
                    <p key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} />
                  );
                })}
            </div>
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
