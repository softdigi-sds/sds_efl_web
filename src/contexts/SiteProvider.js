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
import SmartModal from "./SmartModal";
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
      //console.log("session data " , session_data);
    }
  };

  const logout = () => {
    // Handle logout (e.g., redirect to login page)
    //console.log('Loading out...');
    showAlertAutoClose("Log Out Successful", "success");
    setUser(null);
  };

  useEffect(() => {
    // health_check();
    // this is to get the data from session storage
    updateUserOnLoad();
    // have health check and get the csrf token
    // const interval = setInterval(health_check, 60000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <SiteContext.Provider
      value={{
        setLoading,
        setUser,
        openModal,
        closeModal,      
        logout,
        handleUserChange,
      }}
    >
      {children}
      {isModalOpen && (
        <SmartModal modalOptions={modalOptions} closeModal={closeModal} />
      )}
    </SiteContext.Provider>
  );
};
