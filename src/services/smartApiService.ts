// apiService.js
import axios from "axios";
import CryptoJS from "crypto-js";
import { EMPTY, from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import config from "../config/config";
import { SmartLoader } from "../core";
import { showAlertAutoClose } from "./notifyService";
import { getCsrf, getToken } from "./sessionService";

const _KEY = config.ENCRYPTION_KEY || "";
const ENCRYPTION = config.ENCRYPTION ?? false;

interface CipherParams {
  ciphertext: any;
  iv?: any;
  salt?: any;
}

const CryptoJSAesJson = {
  stringify: function (cipherParams: CipherParams): string {
    const json: { ct: string; iv?: string; s?: string } = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
    };

    if (cipherParams.iv) json.iv = cipherParams.iv.toString();
    if (cipherParams.salt) json.s = cipherParams.salt.toString();

    return JSON.stringify(json);
  },
  parse: function (jsonStr: string): CryptoJS.lib.CipherParams {
    const json = JSON.parse(jsonStr);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(json.ct),
    });

    if (json.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(json.iv);
    if (json.s) cipherParams.salt = CryptoJS.enc.Hex.parse(json.s);

    return cipherParams;
  },
};

const encryptPayload = (data: any) => {
  let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), _KEY, {
    format: CryptoJSAesJson,
  }).toString();
  // console.log(encrypted);
  return btoa(encrypted);
};

const decrypt_data = (encrypted: string) => {
  var decrypted = JSON.parse(
    CryptoJS.AES.decrypt(encrypted, _KEY, {
      format: CryptoJSAesJson,
    }).toString(CryptoJS.enc.Utf8)
  );
  return decrypted;
};

const getPayLoad = (data_in: any) => {
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

const getDecryptedResponse = (response: any) => {
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

const processError = (error: any) => {
  let msg = "Some Thing Went Wrong";
  // console.log("code " , error);
  if (error.code === "ERR_BAD_REQUEST") {
    let out = getDecryptedResponse(error?.response);
    msg = out.data && out.data.message ? out.data.message : "Invalid Request";
    return msg;
  } else if (error.code === "ERR_BAD_RESPONSE") {
    let out = getDecryptedResponse(error?.response);
    msg = out.data && out.data.message ? out.data.message : "Invalid Request";
    return msg;
  }
  //console.log("message " , msg);
  return msg;
};

// Default error handler
const defaultErrorHandler = (errorMessage: string, error: any) => {
  // SmartLoader.hideLoader();
  showAlertAutoClose(errorMessage, "error");
  //console.error('API Request Error:', error);
  // alert(errorMessage);
  return EMPTY;
};

interface ApiOptions {
  handleError?: (msg: string, obj: any) => void;
  requiresAuthorization?: boolean | undefined;
  customHeaders?: any;
  showLoading?: boolean;
  loadingMsg?: string;
}

const get = (url: string, options?: ApiOptions) => {
  const {
    requiresAuthorization = true,
    customHeaders = {},
    showLoading = true,
    loadingMsg = "Fetching... Please Wait",
    handleError,
  } = options || {};
  // Check if authorization is Required and if a token is available
  if (requiresAuthorization) {
    customHeaders["Authorization"] = "Bearer " + getToken();
  }
  if (showLoading) {
    SmartLoader.showLoader(loadingMsg);
  }
  return from(API.get(url, { headers: customHeaders })).pipe(
    catchError((error) => {
      if (showLoading) {
        SmartLoader.hideLoader();
      }
      let errorMessage = processError(error);
      const errorHandler = handleError ? handleError : defaultErrorHandler;
      errorHandler(errorMessage, error);
      return EMPTY;
    }),
    switchMap((response) => {
      response = getDecryptedResponse(response);
      if (showLoading) {
        SmartLoader.hideLoader();
      }
      return of(response); // For example, just returning the response as is
    })
  );
};

const post = (url: string, data: any, options?: ApiOptions) => {
  const {
    requiresAuthorization = true,
    customHeaders = {},
    showLoading = true,
    loadingMsg = "Fetching... Please Wait",
    handleError,
  } = options || {};
  // Check if authorization is Required and if a token is available
  if (requiresAuthorization) {
    // console.log("eneterd insude " , getToken())
    customHeaders["Authorization"] = "Bearer " + getToken();
  }
  customHeaders["X-CSRF-Token"] = getCsrf();
  if (showLoading) {
    SmartLoader.showLoader(loadingMsg);
  }
  // console.log("headers " , customHeaders);
  return from(API.post(url, getPayLoad(data), { headers: customHeaders })).pipe(
    catchError((error) => {
      if (showLoading) {
        SmartLoader.hideLoader();
      }
      let errorMessage = processError(error);
      const errorHandler = handleError ? handleError : defaultErrorHandler;
      errorHandler(errorMessage, error);
      return EMPTY;
    }),
    switchMap((response) => {
      if (showLoading) {
        SmartLoader.hideLoader();
      }
      response = getDecryptedResponse(response);
      // check for msg
      if (response && response.data && response.data.msg) {
        showAlertAutoClose(response.data.msg, "success");
      }
      return of(response); // For example, just returning the response as is
    })
  );
};

export { get, post };
