import React, { useState } from "react";
import Tooltip from "./Tooltip";


const PasswordValidator = () => {
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validations = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  };

  const isPasswordValid =
    validations.minLength &&
    validations.hasUpperCase &&
    validations.hasLowerCase &&
    validations.hasNumber &&
    validations.hasSpecialChar;


    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
      };
  return (
    <div className="is-flex is-justify-content-center is-align-items-center mt-6">
      <div className="column is-4 card mt-6" style={{ position: "relative" }}>
      
        <Tooltip
         content={
      
            <div>
{password.length >= 1 &&(<>
              <p className="mt-1">Password must contain:</p>
              <ul >
                <li className={ validations.minLength ? "primary" : "danger" }>
                  At least 8 characters
                </li>
                <li 
                className={ validations.hasUpperCase ? "primary" : "danger" }>
                  An uppercase letter
                </li>
                <li 
                 className={ validations.hasLowerCase ? "primary" : "danger" }>
                  A lowercase letter
                </li>
                <li 
                 className={ validations.hasNumber ? "primary" : "danger" }>
                  A number
                </li>
                <li
                 
                  className={ validations.hasSpecialChar ? "primary" : "danger" }
                >
                  A special character (!@#$%^&*)
                </li>
              </ul>
              </>)}
            </div>
          }
          position="bottom"
        >
            <div className="is-relative">

           
          <input
            className="input mt-2"
            type={isPasswordVisible ? "text" : "password"} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your password"
          />
           <span
             className="password-view-button"
              onClick={togglePasswordVisibility}
            
            >
              {isPasswordVisible ? <i className="fa fa-unlock-alt" aria-hidden="true"></i> : <i className="fa fa-lock" aria-hidden="true"></i>} {/* Eye icon */}
            </span>
            </div>
        </Tooltip>
        {isPasswordValid && (
          <p className="has-text-primary">Password is valid!</p>
        )}


        {isFocused && !isPasswordValid && (
          <p className="has-text-danger">Enter valid password</p>
        )}
      </div>
    </div>
  );
};

export default PasswordValidator;