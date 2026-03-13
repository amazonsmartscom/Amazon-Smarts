// // src/context/AuthContext.jsx
// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Check if user is already logged in when the app loads
//   useEffect(() => {
//     const storedUser = localStorage.getItem('userInfo');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = async (email, password) => {
//   try {
//     const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    
//     // Save to State and LocalStorage
//     setUser(data);
//     localStorage.setItem('userInfo', JSON.stringify(data));
    
//     return { success: true }; // 🚀 Crucial: Return true so the UI knows to move
//   } catch (error) {
//     return { 
//       success: false, 
//       message: error.response?.data?.message || "Invalid Credentials" 
//     };
//   }
// };

//   const logout = () => {
//     localStorage.removeItem('userInfo');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.jsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in when the app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      // 🚀 CRITICAL FIX: Changed localhost to the Vercel/Render Environment Variable!
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
      
      // Save to State and LocalStorage
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // 🚀 Return true so the UI knows to move forward
      return { success: true }; 
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Invalid Credentials" 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};