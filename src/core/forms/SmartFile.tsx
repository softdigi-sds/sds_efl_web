import React, { ChangeEvent, useEffect, useState,useRef } from "react";
import { validateInput } from "../services/smartValidationService";
import "./SmartFormCss.css";
import { SmartFileProps } from "./SmartFormInterface";

const SmartFile: React.FC<SmartFileProps> = (props) => {
  const {
    label,
    value,
    valueFunction,
    onChange,   
    classList,
    isHorizontal,
    inputProps,
    leftIcon,
    leftIconFunction,
    rightIcon,
    rightIconFunction,
    successMessage,
    validations,
    errorEnable = false,
    errorUpdate,
    isMulti = false,
    placeHolder,
    fileNameEnable=true,
    accept="image/*",
    filePreview=false,
    filePreviewFunction
  } = props;

  const [error, setError] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect will be triggered whenever prop changes
  useEffect(() => {
     
  }, [props]);

  useEffect(() => {           
    handleChange(getValue());
}, []);

  const getValue = () => {
    if (valueFunction) {
      return valueFunction();
    } else {
      return value;
    }
  };

  const updateValidations=(inputValue:any)=>{
    if (validations && validations.length > 0) {
      // console.log("input value " , inputValue);
      let error_message = validateInput(inputValue, validations);
      //console.log("error message " , error_message);
      setError(error_message);
      if (errorUpdate) {
        errorUpdate(error_message);
      }
    }
  }

  useEffect(() => {
    //
    updateValidations(value);
  }, [value]);

  const handleChange = (inputValue: any) => {
    if(onChange && onChange instanceof Function){
      onChange(inputValue);
    }
  };

  /**
   *  label display function
   *
   * @returns
   */
  const labelDisplay = () => {
    if (label) {
      return <label className="label">{label}</label>;
    }
  };

  const controlClasses = () => {
    let classList = ["control"];
    if (leftIcon || leftIconFunction) {
      classList.push("has-icons-left");
    }
    if (rightIcon || rightIconFunction) {
      classList.push("has-icons-right");
    }
    if (inputProps && inputProps.isLoading) {
      classList.push("is-loading");
    }
    return classList;
  };

  const leftIconDisplay = () => {
    if (leftIcon) {
      return (       
          <i className={"fa " + leftIcon} />      
      );
    } else if (leftIconFunction) {
      return leftIconFunction(value);
    }
  };

  const rightIconDisplay = () => {
    if (rightIcon) {
      return (
        <div className="icon is-small is-left">
          {" "}
          <i className={"fa " + rightIcon} />{" "}
        </div>
      );
    } else if (rightIconFunction) {
      return rightIconFunction(value);
    }
  };

  const successMessageDisplay = () => {
    return (
      successMessage && <p className="help is-success">{successMessage}</p>
    );
  };

  const fieldClasses = () => {
    let classes = ["field"];
    if (isHorizontal) {
      classes.push("is-horizontal");
    }
    if (classList) {
      classes = [...classes, ...classList];
    }
    return classes;
  };

  const inputClasses = () => {
    let classes = ["file"];
    if (inputProps && inputProps.isStatic) {
      classes.push("is-static");
    }
    if (inputProps && inputProps.isFocussed) {
      classes.push("is-focused");
    }
    if (errorEnable && error && error.length > 0) {
      classes.push("is-danger");
    }
    const value_input = getValue();
    // check if validations are there and
    if (
      value_input &&
      value_input.length > 0 &&
      validations &&
      validations.length > 0
    ) {
      if (!error) {
        classes.push("is-success");
      }
    }
    return classes;
  };

  const disabled_input = () => {
    //  console.log("disabled input " );
    if (inputProps && inputProps.disabled) {
      return inputProps.disabled;
    }
    if (inputProps && inputProps.disabledFunction) {
      // console.log("disabled or not ", inputProps.disabledFunction("test"))
      return inputProps.disabledFunction("test");
    }

    return false;
  };

  const errorMessageDisplay = () => {
    return (
      errorEnable &&
      error &&
      error.length > 0 && <p className="help is-danger">{error}</p>
    );
  };

  

  const handleInputChange = (file: any) => {
    // const inputValue = value;
    //handleChange(inputValue);
    // validation of file size and extension has to be done
   // console.log("handle file ujh ", file);
    // then send the update
    let actualValue = getValue();
    if (!Array.isArray(actualValue)) {
      actualValue = [];
    }
    if (isMulti) {
      actualValue.push(file);
      handleChange(actualValue);
    } else {
      const inputValue = file;
      //console.log("handle fie ", inputValue);
      // console.log("check event" , inputValue , " event " , event);
      handleChange(inputValue);
    }
  };

  const readFileContent = (file:any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
        const base64Content = reader.result.split(",")[1]; // Base64 content
        resolve(base64Content);
        }else{
          resolve("");
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async(event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      let fileObj:any = {
        name: files[0].name,
        type:files[0].type,
        size:files[0].size,
        content : await readFileContent(files[0])
      }
      handleInputChange(fileObj);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  
    event.target.value = '';
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      handleInputChange(files[0]);
      //  console.log("file uploaded ", file);
      /*
      if (file.size <= 2 * 1024 * 1024) {
        const newInput = { file };
       // setData((prevData) => [...prevData, newInput]);
      } else {
        alert(
          `File ${file.name} size exceeds 2MB limit. Please select a smaller file.`
        );
      }*/
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const previewFileNameSingle=()=>{
    if(isMulti){
      return "";
    }
    // get the value
    let actualValue = getValue();
    let fileName = actualValue && actualValue.name!==undefined ? actualValue.name : "";
    //console.log("act value ", actualValue);
    return <span className="file-name">{fileName}</span>
  }

  const filePreviewDisplay=()=>{
    if(filePreviewFunction && filePreviewFunction instanceof  Function){
      return filePreviewFunction(getValue());
    }
  }

  const fileUploadButton = () => {
    return (
      <div className={inputClasses().join(" ")}>
        <label
          className="file-label"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            className="file-input"
            type="file"
            name="resume"
            accept={accept}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <span className="file-cta">
            <span className="file-icon">
            {leftIconDisplay()}
            </span>
            <span className="file-label">{placeHolder}</span>
          </span>
          {fileNameEnable && previewFileNameSingle()}
        </label>
       
      </div>
    );
  };

  return (
    <div className={fieldClasses().join(" ")}>
      {labelDisplay()}
      <div className={controlClasses().join(" ")}>
        <div className="smart-select">
          {fileUploadButton()}
          </div> 
          {filePreview && filePreviewDisplay()}     
        {rightIconDisplay()}
      </div>
      {successMessageDisplay()}
      {errorMessageDisplay()}
    </div>
  );
};

export default SmartFile;
