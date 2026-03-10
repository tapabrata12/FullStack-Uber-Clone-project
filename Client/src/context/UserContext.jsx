import React, { createContext } from 'react'

export const UserDataContext = createContext();
const UserContext = ({ children }) => {
  const value = "Tapabrata"
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext