import React, { createContext, useState } from "react";

export const ActiveUserContext = createContext();
export const ActiveUserDispatchContext = createContext();

export function ActiveUserProvider(props) {
  const [activeUser, setActiveUser] = useState(null);

  return (
    <ActiveUserContext.Provider value={activeUser}>
      <ActiveUserDispatchContext.Provider value={setActiveUser}>
        {props.children}
      </ActiveUserDispatchContext.Provider>
    </ActiveUserContext.Provider>
  );
}
