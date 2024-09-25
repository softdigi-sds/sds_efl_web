import CryptoJS from 'crypto-js';
import config from '../config/config';
const USER_STORAGE_KEY = 'userEncryptedSessionStorage';
const REMEBER_ME_INDEX = "rememberedUsernameCustomer";
const CSRF_INDEX = "smartCropTokenIndex"
const ENC_KEY = config.ENCRYPTION_KEY || "";
const encrypt_data=(data:string)=>{
  const encryptedData = CryptoJS.AES.encrypt(data,ENC_KEY).toString();
  return encryptedData;
}


const decrypt_data=(data:string)=>{
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(data, ENC_KEY);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  } catch (error) {
    return null;
  }
}

const encrypt = (data:any) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), ENC_KEY).toString();
  return encryptedData;
};

const decrypt = (encryptedData:string) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, ENC_KEY);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    return null;
  }
};

const getSessionStorage = (key:string) => {
  const encryptedData = sessionStorage.getItem(key);
// console.log("emcrypted data ", encryptedData);
  if (encryptedData) {
    return decrypt(encryptedData);
  }
  return null;
};

const setSessionStorage = (key:string, data:any) => {
  const encryptedData = encrypt(data);
  sessionStorage.setItem(key, encryptedData);
};

const setUserSession = (data:any) => {
  setSessionStorage(USER_STORAGE_KEY, data);
}

const getUserSession = (index:string) => {
  let session_data = getSessionStorage(USER_STORAGE_KEY);
 // console.log("session data ", session_data);
  if (index && index !== null) {
    return session_data && session_data[index] !== undefined ? session_data[index] : "";
  }
  return session_data;
}

const getToken = () => {
  return getUserSession("accessToken");
}

const clearSessionStorage = () => {
  sessionStorage.clear()
};


const setLocalStorage=(key:string,data:any)=>{
  const encryptedData = encrypt(data);
  localStorage.setItem(key, encryptedData);
}

const getLocalStorage = (key:string) => {
  const encryptedData = localStorage.getItem(key);
  if (encryptedData) {
    return decrypt(encryptedData);
  }
  return null;
};

const removeLocalStorage = (key:string) => {
  localStorage.removeItem(key);
};


const setRemeberMe=(data:any)=>{
  setLocalStorage(REMEBER_ME_INDEX,data);
}

const getRemeberMe=()=>{
   return getLocalStorage(REMEBER_ME_INDEX);
}

const removeRemeberMe = () => {
  removeLocalStorage(REMEBER_ME_INDEX);
};

const setCsrf=(data:any)=>{
  setLocalStorage(CSRF_INDEX,data);
}

const getCsrf=()=>{
   return getLocalStorage(CSRF_INDEX);
}




export {
  clearSessionStorage, decrypt_data, encrypt_data, getCsrf, getRemeberMe, getSessionStorage, getToken,
  getUserSession, removeRemeberMe, setCsrf, setRemeberMe,
  setSessionStorage, setUserSession
};

