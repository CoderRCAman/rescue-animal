import { useState, useEffect, useContext, createContext } from "react";
const AppContext = createContext();
export default function StoreProvider({ children }) {
  const [userInfo, setInfo] = useState();
  const [feeds, setFeeds] = useState();
  const sharedState = {
    userInfo: userInfo,
    feeds: feeds,
    setInfo: setInfo,
    setFeeds: setFeeds,
  };
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(AppContext);
}
