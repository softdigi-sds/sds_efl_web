// ThemeContext.js
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { showAlertAutoClose } from "../services/notifyService";
import { getUserSession, setUserSession } from "../services/sessionService";
// import sessionActivityService from '../services/sessionActivityService';

const SiteContext = createContext();

export const useSiteContext = () => {
  return useContext(SiteContext);
};

export const SiteProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [user, setUserData] = useState(getUserSession());
  // these are modal contexts
  const [modalOptions, setModalOptions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserChange = (name, value) => {
    // console.log("name ", name , "value " , value)
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  //
  const setLoading = (status, msg = "") => {
    setIsLoading(status);
    setLoadingMsg(msg);
  };
  const setUser = (data) => {
    setUserData(data);
    setUserSession(data);
  };

  const openModal = useCallback((options) => {
    setModalOptions(options);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOptions(null);
    setIsModalOpen(false);
  }, []);

  const updateUserOnLoad = () => {
    let session_data = getUserSession();
    if (session_data) {
      setUserData(session_data);
      if (session_data.ename !== undefined) {
      }
    }
  };

  const logout = () => {
    showAlertAutoClose("Log Out Successful", "success");
    setUser(null);
  };

  useEffect(() => {
    updateUserOnLoad();
  }, []);

  return (
    <SiteContext.Provider
      value={{
        user,
        setLoading,
        setUser,
        openModal,
        closeModal,
        isModalOpen,
        modalOptions,
        logout,
        handleUserChange,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
