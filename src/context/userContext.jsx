import React, { createContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// Create a UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    // Read the cookie containing user data
    // const userDataCookie = Cookies.get('userData');

    // if (userDataCookie) {
    //   // Parse the user data from the cookie
    //   const userData = JSON.parse(userDataCookie);
    //   // Set the user state
    //   setUser(userData);
    // }

    localStorage.setItem('user', JSON.stringify(user))
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};






// import React, { createContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Fetch user data from backend or cookie on component mount
//     const fetchUser = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:3000/api/v1/users/loggedIn'); // Endpoint to fetch user data
//         if (response.ok) {
//           const userData = await response.json();
//           setUser(userData);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContextProvider, UserContext };
