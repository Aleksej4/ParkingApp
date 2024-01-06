import React, { createContext, useState} from 'react';

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("")

  const setUserIdData = (newUserId) => {
    setUserId(newUserId)
  }


  return (
    <DataContext.Provider value={{userId, setUserIdData}}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
