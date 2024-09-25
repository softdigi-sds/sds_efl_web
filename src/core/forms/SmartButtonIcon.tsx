import React from 'react';
import { SmartButtonProps } from './SmartFormInterface';
const SmartButtonIcon: React.FC<SmartButtonProps> = (props) => {
    const {
        label,
        type = "button",
        leftIcon,
        rightIcon,
        classList,
        disabled,
        disabledFunction,
        onClick,
        size="normal",
        isLoading=false,
        isRounded=false
    } = props;


    const handleChange = () => {
        if (onClick) {
            onClick();
        }
    }

    /**
     *  label display function
     * 
     * @returns 
     */
    const labelDisplay = () => {
        if (label) {
            return <span>{label}</span>
        }
    }



    const leftIconDisplay = () => {
        return typeof leftIcon=="string" ? <span className="icon"> <i className={"fa " + leftIcon} /> </span>
         : leftIcon;
    }

    const rightIconDisplay = () => {
         return typeof rightIcon=="string" ? <span className="icon"> <i className={"fa " + rightIcon} /> </span>
         : rightIcon;
    }




    const buttonClasses = () => {
        let classes = ["button"];
        if (type == "icon") {
            classes = ["icon"]
        }
        if(size){
            classes.push("is-"+size)
        }
        if(isRounded){
            classes.push("is-rounded")
        }
        if(isLoading){
            classes.push("is-loading")
        }
        if (classList) {
            classes = [...classes, ...classList];
        }


        return classes;
    }

    const disabled_input = () => {
        //  console.log("disabled input " );
        if (disabled) {
            return disabled;
        }
        if (disabledFunction) {
            // console.log("disabled or not ", inputProps.disabledFunction("test"))
            return disabledFunction("test");
        }

        return false;
    }

    const button_display = () => {
        return (
            <button
                className={buttonClasses().join(" ")}
                disabled={disabled_input()}
                onClick={() => handleChange()}
            >
                {leftIconDisplay()}
                {labelDisplay()}
                {rightIconDisplay()}
            </button>
        );
    }

    const iconDisplay = () => {
        return (<span
            className={buttonClasses().join(" ")}
            onClick={() => handleChange()}
        >
            {leftIconDisplay()}
        </span>
        );
    }
    return type == "icon" ? iconDisplay() : button_display();
};

export default SmartButtonIcon;