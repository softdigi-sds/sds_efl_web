import React from 'react';
import { SmartModalInterface } from './SmartLoaderInterface';
import "./SmartSoftModal.scss";
const SmartSoftModal: React.FC<SmartModalInterface> = (props) => {
    const { active,title, className, content, footer, closeFunction, closeBody = true, width = 80 } = props
   // console.log("props " , props)
    const closeModalOnBody = () => {
        if (closeBody === true && closeFunction) {         
            closeFunction();
        }
    }
    return (
        <div className={`modal ${active ? "is-active":""} smart-modal-${width} ${className ? className : ""}`}>
            <div className="modal-background" onClick={closeModalOnBody}></div>
            <div className="modal-card ">
                {title && <div className="modal-card-title"><span>{title}</span></div>}
                <span className='icon is-medium modal-close-btn' onClick={closeFunction}>
                    <i className='fa fa-xmark'></i>
                </span>
                <section className="modal-card-body p-3">{content}</section>
                {footer && <footer className="modal-card-foot">{footer}</footer>}
            </div>
        </div>
    );
}
export default SmartSoftModal
