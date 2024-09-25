// apiService.js
import axios from "axios";
import CryptoJS from "crypto-js";
import { EMPTY, from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import config from "../config/config";
import { SmartLoader } from "../core";
import { showAlertAutoClose } from "./notifyService";
import { getCsrf, getToken } from "./sessionService";

const _KEY = config.ENCRYPTION_KEY;
const ENCRYPTION = config.ENCRYPTION ?? false;

var CryptoJSAesJson = {
  stringify: function (cipherParams) {
    var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j);
  },
  parse: function (jsonStr) {
    var j = JSON.parse(jsonStr);
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  },
};

const encryptPayload = (data) => {
  let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), _KEY, {
    format: CryptoJSAesJson,
  }).toString();
  // console.log(encrypted);
  return btoa(encrypted);
};

const decrypt_data = (encrypted) => {
  var decrypted = JSON.parse(
    CryptoJS.AES.decrypt(encrypted, _KEY, {
      format: CryptoJSAesJson,
    }).toString(CryptoJS.enc.Utf8)
  );
  return decrypted;
};

const getPayLoad = (data_in) => {
  //console.log("data in ", data_in);
  data_in["timestamp"] = Date.now();
  data_in["timeszone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (ENCRYPTION) {
    let encr_data = encryptPayload(data_in);
    return { data: encr_data };
  } else {
    return data_in;
  }
};

const API = axios.create({
  baseURL: config.REACT_APP_API_URL,
});

const getDecryptedResponse = (response) => {
  if (ENCRYPTION && response.data) {
    let decoded = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Base64.parse(response.data)
    );
    // console.log("decoded" , decoded);
    let decrypted = decrypt_data(JSON.parse(decoded));
    response.data = JSON.parse(decrypted);
  }
  //console.log(response);
  return response;
};

const processError = (error) => {
  let msg = "Some Thing Went Wrong";
  // console.log("code " , error.code);
  if (error.code === "ERR_BAD_REQUEST") {
    let out = getDecryptedResponse(error?.response);
    msg = out.data && out.data.message ? out.data.message : "Invalid Request";
    return msg;
  } else if (error.code === "ERR_BAD_RESPONSE") {
    let out = getDecryptedResponse(error?.response);
    msg = out.data && out.data.message ? out.data.message : "Invalid Request";
    return msg;
  }
  // console.log("message " , msg);
  return msg;
};

// Default error handler
const defaultErrorHandler = (errorMessage) => {
  SmartLoader.hideLoader();
  console.log(" default habndler ");
  showAlertAutoClose(errorMessage);
  //console.error('API Request Error:', error);
  // alert(errorMessage);
  return EMPTY;
};

const get = (
  url,
  handleError,
  requiresAuthorization = true,
  customHeaders = {}
) => {
  // Check if authorization is Required and if a token is available
  if (requiresAuthorization) {
    customHeaders["Authorization"] = "Bearer " + getToken();
  }
  return from(API.get(url, { headers: customHeaders })).pipe(
    catchError((error) => {
      let errorMessage = processError(error);
      const errorHandler = handleError ? handleError : defaultErrorHandler;
      errorHandler(errorMessage, error);
      return EMPTY;
    }),
    switchMap((response) => {
      response = getDecryptedResponse(response);
      return of(response); // For example, just returning the response as is
    })
  );
};

const post = (
  url,
  data,
  handleError,
  requiresAuthorization = true,
  customHeaders = {}
) => {
  // Check if authorization is Required and if a token is available
  if (requiresAuthorization) {
    // console.log("eneterd insude " , getToken())
    customHeaders["Authorization"] = "Bearer " + getToken();
  }
  customHeaders["X-CSRF-Token"] = getCsrf();
  // console.log("headers " , customHeaders);
  return from(API.post(url, getPayLoad(data), { headers: customHeaders })).pipe(
    catchError((error) => {
      // console.log("error ", error);
      let errorMessage = processError(error);
      const errorHandler = handleError ? handleError : defaultErrorHandler;
      errorHandler(errorMessage, error);
      return EMPTY;
    }),
    switchMap((response) => {
      response = getDecryptedResponse(response);
      // Process the response here
      // console.log("Response:", response);
      // Return the response or any modified version of it
      return of(response); // For example, just returning the response as is
    })
  );
};

export { get, post };

