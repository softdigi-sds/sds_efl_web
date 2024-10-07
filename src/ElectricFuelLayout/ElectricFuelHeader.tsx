import React from "react";
import "./ElectricFule.css";
import { LOGO } from "../services/ImageService";
import HeaderNavBar from "./HeaderNavBar";
import { useNavigate } from "react-router-dom";

const ElectricFuelHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogin = (index: string) => {
    navigate(index);
  };

  const headerRow = () => {
    return (
      <>
        <div className="content">
          <div className="top p-0">
            <div className="topmenu">
              <div className="container pl-4 pr-4">
                <div className="row">
                  <div className="columns is-vcentered is-multiline">
                    
                 
                    <div className="column is-hidden-mobile is-6-tablet is-6-desktop">
                      <p className="is-flex is-flex-direction-column-mobile is-flex-direction-row-tablet is-flex-wrap-wrap">
                        <span className="is-size-7-mobile is-size-6-tablet">
                          <i className="fa fa-phone" aria-hidden="true"></i> +91 8121009284
                        </span>
                        <span className=" mt-0-tablet ml-0-mobile ml-5-tablet is-size-7-mobile is-size-6-tablet">
                          <i className="fa fa-envelope-o" aria-hidden="true"></i> Email: connect@electricfuel.co.in
                        </span>
                      </p>
                    </div>
  
             
                    <div className="column is-12-mobile is-6-tablet is-6-desktop is-flex is-justify-content-flex-end">
                      <div className="mb-3-mobile">
                        <button
                          className="smart-login-button is-size-7-mobile is-size-6-tablet"
                          onClick={() => handleLogin("/login")}
                        >
                          Login
                        </button>
                      </div>
  
                      <div className="has-text-right ml-4">
                        <div className="social-icon">
                          <ul className="list-inline is-flex is-flex-wrap-wrap">
                            <li className="is-size-7-mobile is-size-6-tablet">
                              <a href="#" className="icon is-medium">
                                <i className="fab fa-facebook"></i>
                              </a>
                            </li>
                            <li className="is-size-7-mobile is-size-6-tablet">
                              <a href="#" className="icon is-medium">
                                <i className="fab fa-instagram"></i>
                              </a>
                            </li>
                            <li className="is-size-7-mobile is-size-6-tablet">
                              <a href="#" className="icon is-medium">
                                <i className="fab fa-linkedin"></i>
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
  

  const headerMain = () => {
    return (
      <>
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="columns is-vcentered is-flex-mobile">
                <div className="column is-5-mobile is-6-desktop ">
                  <div className="logo pt-1 pb-1 m-1-mobile">
                    <img src={LOGO} alt="Logo" className="img-responsive " />
                  </div>
                </div>
                <div className="column is-7-mobile is-6-desktop">
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
        {headerRow()}
        {headerMain()}
      </div>
    </>
  );
};

export default ElectricFuelHeader;
