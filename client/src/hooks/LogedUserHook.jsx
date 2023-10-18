import { createContext, useState } from 'react';

const UserContext = createContext(); 
const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };