import React, { createContext, useState, useEffect } from 'react';

export const Api = createContext();

export const ApiProvider = ({ children }) => {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const guide = "E124A22C-C893-4A28-AA12-98022EF9B5BB";
            try {
                const res = await fetch(`https://exam.icsi.edu/consentform/utility/React_chatbot?guide=${guide}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setApiData(data.data);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };

        fetchData();
    }, []);

    return (
        <Api.Provider value={{ apiData }}>
            {children}
        </Api.Provider>
    );
};
