import ReactDOM from 'react-dom';
import { SmartLoaderInterface } from './SmartLoaderInterface';
import './SmartPageLoader.scss'; // Create a separate CSS file for styling
const loaderClasses={
    NORMAL:"smart-loader",
    DYNAMIC:"smart-spinner-loader",
    SETTING:"smart-settings-loader",
    STAR:"smart-start-loader"
}



const Loader:React.FC<SmartLoaderInterface> = (props) => {
  const { msg,type } = props
  const loaderType = type ? type : window.loaderType || 'NORMAL'; 
  return (
    <div className="smart-loader-overlay">
      <div className={loaderClasses[loaderType]}></div>
      <span>{msg || "Loading.. Please Wait"}</span>
    </div>
  );
};

let loaderDiv:any;

export const showLoader = (msg:string|undefined=undefined,type:any="") => {
  if (!loaderDiv) {
    loaderDiv = document.createElement('div');
    document.body.appendChild(loaderDiv);
    ReactDOM.render(<Loader msg={msg} type={type}/>, loaderDiv);
  }
};

export const hideLoader = () => {
  if (loaderDiv) {
    ReactDOM.unmountComponentAtNode(loaderDiv);
    document.body.removeChild(loaderDiv);
    loaderDiv = null;
  }
};