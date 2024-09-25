import React from 'react';
import './ElectricFule.css';
import { LOGO } from '../services/ImageService';
import HeaderNavBar from './HeaderNavBar';
import { useNavigate } from 'react-router-dom';



const ElectricFuelHeader: React.FC = () => {

    const navigate = useNavigate();
    const handleLogin = (index:string) => {
      navigate( index);
    };
    const header_row = () => {
        return (
            <>
                <div className="content">
                    <div className="top p-0">
                        <div className="topmenu">
                            <div className="container pl-4 pr-4">
                                <div className="row">
                                    <div className="columns is-vcentered">
                                        <div className="column is-8">
                                            <p>
                                                <span>
                                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                                    +91 1234567890
                                                </span>
                                                <span>
                                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                                    Email: Test@gmail.com
                                                </span>
                                            </p>
                                        </div>
                                      
                                        <div className="column is-4 is-flex is-justify-content-flex-end">
                                            <div >
                                            <button className='smart-login-button' onClick={()=>handleLogin("/login")}>Login</button>
                                            </div>
                                      
                                            <div className="has-text-right">
                                                <div className="social-icon">
                                                    <ul className="list-inline">
                                                        <li>
                                                      
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-instagram" aria-hidden="true"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const header_main = () => {
        return (
            <>
                <div className="header">
                    <div className="container">
                        <div className="row">
                            <div className="columns">
                                <div className="column is-3">
                                    <div className="logo pt-1 pb-1">
                                        <img src={LOGO} alt="Logo" className="img-responsive" />
                                    </div>
                                </div>
                                <div className="column is-9">
                            <HeaderNavBar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div>
                {header_row()}
                {header_main()}
            </div>
        </>
    );
};



export default ElectricFuelHeader
