import React, { useState, useEffect, useContext } from 'react';
import './Options.css';
import { Api } from '../Api/Api';

const Options = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeDescription, setActiveDescription] = useState('');
  const [optionsData, setOptionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { apiData } = useContext(Api);
  const [contextMessage, setContextMessage] = useState('');

  const handleMenuClick = () => {
    setShowOptions(!showOptions);
    // Reset submenu related state when toggling menu
    setActiveSubmenu(null);
    setActiveDescription('');
    setSubmenuOpen(false);
  };

  const handleOptionClick = (option) => {
    // Toggle main menu expansion, reset submenu selection if relevant
    if (activeSubmenu === option.MENUNAME) {
      setActiveSubmenu(null);
      setActiveDescription('');
    } else {
      setActiveSubmenu(option.MENUNAME);
      setActiveDescription('');
    }
  };

  const handleSubmenuClick = (option) => {
    // When a submenu option is clicked, record its description and set the submenu view.
    setActiveDescription(option.Description);
    setContextMessage(`You selected: ${option.Label}`);
    setActiveSubmenu(option.MENUNAME);
    setSubmenuOpen(true);
  };

  const handleBackToMainMenu = () => {
    // Reset to show main menu options and clear the active submenu state.
    setActiveSubmenu(null);
    setActiveDescription('');
    setSubmenuOpen(false);
  };

  // Group options by MENUNAME
  const groupedOptions = apiData.reduce((acc, option) => {
    if (!acc[option.MENUNAME]) {
      acc[option.MENUNAME] = [];
    }
    acc[option.MENUNAME].push(option);
    return acc;
  }, {});

  return (
    <div className="options-container">
      {!showOptions ? (
        <button className="option-button" onClick={handleMenuClick}>
          Menu
        </button>
      ) : (
        <div className="options-links">
          {loading && <p>Loading options...</p>}
          {error && <p className="error-message">{error}</p>}
          {/* Show main menu items if no submenu option has been clicked */}
          {!submenuOpen ? (
            Object.keys(groupedOptions).map((menuname) => (
              <div key={menuname}>
                <p
                  onClick={() => handleOptionClick({ MENUNAME: menuname })}
                  className="option-link"
                >
                  {menuname}
                </p>
                {activeSubmenu === menuname && (
                  <div className="submenu">
                    {groupedOptions[menuname].map((option) => (
                      <p
                        key={option.Label}
                        onClick={() => handleSubmenuClick(option)}
                        className="sub-option-link"
                      >
                        {option.Label}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (

            <div className="submenu">
              {contextMessage && <div className="context-message">{contextMessage}</div>}
              {activeDescription ? (
                <p className="description">{activeDescription}</p>
              ) : (

                <>
                  {activeSubmenu &&
                    groupedOptions[activeSubmenu].map((option) => (
                      <p
                        key={option.Label}
                        onClick={() => handleSubmenuClick(option)}
                        className="sub-option-link"
                      >
                        {option.Label}
                      </p>
                    ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
      {(
        <button onClick={handleBackToMainMenu} className="fixed-bottom-left">
          Back
        </button>


      )}
    </div>
  );
};

export default Options;
