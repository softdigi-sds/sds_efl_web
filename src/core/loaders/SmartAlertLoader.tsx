import ReactDOM from 'react-dom';
import { SmartAlertButtonInterface, SmartAlertInterface } from './SmartLoaderInterface';
import './SmartPageLoader.scss'; // Create a separate CSS file for styling
const loaderClasses = {
  NORMAL: "smart-loader",
  DYNAMIC: "smart-spinner-loader",
  SETTING: "smart-settings-loader",
  STAR: "smart-start-loader"
}
const AlertLoader: React.FC<SmartAlertInterface> = (props) => {
  const { title, content, className, width, buttons = [], alertFunction } = props;
  let defaultButtons: SmartAlertButtonInterface[] = [
    {
      index: "no",
      label: "Cancel",
      icon: "fa fa-close",
      className: "is-danger",
      isClose: true
    },
    {
      index: "yes",
      label: "Yes",
      icon: "fa fa-check",
      className: "is-success"
    },
  ];
  let propButtons = defaultButtons;
  if (buttons && buttons.length > 0) {
    propButtons = buttons;
  }

  const iconDisplay = (item: SmartAlertButtonInterface) => {
    if (item.icon) {
      return typeof item.icon == "string" ?
        <span className='icon'><i className={`${item.icon}`}></i></span> : item.icon;
    }
    return false;
  }

  const executeFunction = (item: SmartAlertButtonInterface) => {
    // execute the function on button click   
    if (alertFunction) {
      alertFunction(item.index);
    }
    if (item.isClose) {
      hide();
    }
  }


  const footerFunction = () => {
    return <footer className="modal-card-foot">
      {
        propButtons.map((item, index) => {
          return <button key={`action_button_${index}`} onClick={() => executeFunction(item)}
            className={`button ${item.className ? item.className : ""}`}>
            {iconDisplay(item)}
            <span>{item.label}</span></button>
        })
      }
    </footer>
  }
  return (
    <div className={`modal is-active smart-alert-modal smart-modal-${width} ${className ? className : ""}`}>
      <div className="modal-background" ></div>
      <div className="modal-card ">
        {title && <div className="modal-card-title"><span>{title}</span></div>}
        <section className="modal-card-body p-3">{content}</section>
        {footerFunction()}
      </div>
    </div>
  );
};

let alertDiv: any;

export const show = (props: any) => {
  if (!alertDiv) {
    alertDiv = document.createElement('div');
    document.body.appendChild(alertDiv);
    ReactDOM.render(<AlertLoader {...props} />, alertDiv);
  }
};

export const hide = () => {
  if (alertDiv) {
    ReactDOM.unmountComponentAtNode(alertDiv);
    document.body.removeChild(alertDiv);
    alertDiv = null;
  }
};