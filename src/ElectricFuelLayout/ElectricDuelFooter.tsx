import React from 'react';


const ElectricDuelFooter: React.FC = () => {
  return (
    <footer className="footer has-background-dark">
      <div className="container">
        <div className="columns has-text-white">
          <div className="column">
            <h3 className="title is-4 has-text-white">Electric<span className="has-text-success">Fuel</span></h3>
            <p>TTL ELECTRIC FUEL PVT. LTD., headquartered at Hyderabad is one of the fastest developing EV Charging Company.</p>
          </div>

          <div className="column">
            <h3 className="title is-5 has-text-white">Address</h3>
            <p>D.No. 8-2-616,<br />
              Plot 4, Road No 11, Mithila Nagar,<br />
              Behind Minerva Grand Hotel,<br />
              Banjara Hills, Hyderabad - 500034,<br />
              Telangana - INDIA.</p>
          </div>

          <div className="column">
            <h3 className="title is-5 has-text-white">Reach Us</h3>
            <p>Cell: +91 8121009284</p>
            <p>Email: <a href="mailto:connect@electricfuel.co.in" className="has-text-white">connect@electricfuel.co.in</a></p>
            <div className="social-icons">
              <a href="#" className="icon is-medium has-text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="icon is-medium has-text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="icon is-medium has-text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="column">
            <h3 className="title is-5 has-text-white">Newsletter</h3>
            <div className="field has-addons">
              <div className="control">
                <input className="input" type="email" placeholder="Enter your email" />
              </div>
              <div className="control">
                <button className="button is-success">Submit</button>
              </div>
            </div>
          </div>
        </div>

        <div className="content has-text-centered has-text-grey-lighter">
          <p>
            <a href="#" className="has-text-grey-light">Disclaimer</a> | 
            <a href="#" className="has-text-grey-light"> Legal Policy</a> | 
            <a href="#" className="has-text-grey-light"> Terms of use</a>
          </p>
          <p>Copyright © 2022 Electricfuel. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ElectricDuelFooter;
