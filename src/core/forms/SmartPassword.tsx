import React, { useEffect, useState } from "react";
import { SmartInputProps } from "./SmartFormInterface";
import SmartInput from "./SmartInput";

const SmartPassword: React.FC<SmartInputProps> = (props) => {
  const {   
   
    value,
    passwordValidator,
    onChange,
    // type,
    rightIcon,
    rightIconFunction,
    ...rest
  } = props;

  const [type, setType] = useState(true);
  const [strength, setStrength] = useState(0);

  const testPasswRegexp = (passw:any, regexp:any) => {  
    return regexp.test(passw);
    
  };

  const calculateStrength = (password: string) => {
    let score = 0;
    if (!password) {
      setStrength(0);
      return;
    }
    // if (password.length > 3) {
    //   score += 1;
    // }
    // if (password.length > 6) {
    //   score += 1;
    // }
    // // Add points for uppercase letters
    // if (/[A-Z]/.test(password)) {
    //   score += 1;
    // }
    // // Add points for lowercase letters
    // if (/[a-z]/.test(password)) {
    //   score += 1;
    // }
    // // Add points for numbers
    // if (/\d/.test(password)) {
    //   score += 1;
    // }
    // // Add points for special characters
    // if (/[^A-Za-z0-9]/.test(password)) {
    //   score += 1;
    // }

    let strength =0;
  
    const moderate = /(?=.*[A-Z])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[A-Z])(?=.*[a-z]).{5,}/g; 
    const strong = /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d]).{7,}|(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=.*[\d]).{7,}/g;
    const extraStrong = /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]).{9,}/g;
    
    if(testPasswRegexp(password, extraStrong)) {
      strength = 10;
    } else if(testPasswRegexp(password, strong)) {
      strength = 8;
    } else if(testPasswRegexp(password, moderate)) {
      strength = 6;
    } else if(password.length > 0) {
      strength =4;  
    }
    //console.log("score = " , score);
    setStrength(strength);
  };

  const handleChange = (value: string) => {
    if (passwordValidator) {
      calculateStrength(value);
    }
    if(onChange)
        onChange(value);
  };

  const password_show = () => {
    setType(!type);
  };

  const rightIconFunctionPassword = () => {
    return (
      <span
        className="icon is-small is-right smart-password-icon smart-soft-cursor"
        onClick={password_show}
      >
        <i className={"fa " + (type ? "fa-eye-slash" : "fa-eye")}></i>
      </span>
    );
  };

  const display_text = () => {
    let class_name = "";
    let text_val = "";
    if(strength ==10){
      class_name="smart-pass-extra";
      text_val = "Extra Strong";
    } else if(strength==8){
      class_name="smart-pass-strong";
      text_val = "Strong";
    } else if(strength==6){
      class_name="smart-pass-moderate";
      text_val = "Moderate";
    }else {
      class_name="smart-pass-week";
      text_val="Week";
    }
    return (
      value &&
      value.length > 0 && (
        <>
        {/* <span
          className={`progress-text ${
            strength < 4
              ? "has-text-danger"
              : strength < 6
              ? "has-text-warning"
              : "has-text-success"
          }`}
        >
          {strength < 4 ? "Week" : strength < 6 ? "Average" : "Strong"}
        </span> */}
        <div className="smart-password-progress">
            <div className={`smart-password-progress-bar ${class_name}`}> {text_val}</div>
        </div>
        </>
      )
    );
  };

  return (
    <div className="mb-3 smart-password-field">
      <SmartInput
        {...rest}
        key="text-4"
        value={value || ""}
        onChange={(value) => handleChange(value)}
        rightIcon=""
        type={type ? "password" : "text"}
        rightIconFunction={rightIconFunctionPassword}
        
      />
      {passwordValidator && display_text()}
      {/* {passwordValidator && value && value.length > 0 && (
        <progress
          className={`progress ${
            strength < 4
              ? "is-danger"
              : strength < 6
              ? "is-warning"
              : "is-success"
          }`}
          value={strength}
          max="6"
        >
          {strength}0%
        </progress>
      )} */}
    </div>
  );
};
export default SmartPassword;
