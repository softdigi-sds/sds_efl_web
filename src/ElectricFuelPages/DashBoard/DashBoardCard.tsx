import React from "react";

const DashBoardCard = () => {
  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-12-mobile is-6-tablet is-one-quarter-desktop">
          <div className="stat-card gradient-blue box has-text-centered">
            <div className="stat-number">2050</div>
            <div className="stat-label">Vehicle Count</div>
            <span className="icon is-large is-size-4">
              <i className="fa fa-shopping-cart"></i>
            </span>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-one-quarter-desktop">
          <div className="stat-card gradient-pink box has-text-centered">
            <div className="stat-number">3250</div>
            <div className="stat-label">Consumption Units</div>
            <span className="icon is-large is-size-4">
              <i className="fa fa-wallet"></i>
            </span>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-one-quarter-desktop">
          <div className="stat-card gradient-green box has-text-centered">
            <div className="stat-number">87.5%</div>
            <div className="stat-label">Number of Vendors</div>
            <span className="icon is-large is-size-4">
              <i className="fa fa-pie-chart"></i>
            </span>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-one-quarter-desktop">
          <div className="stat-card gradient-orange box has-text-centered">
            <div className="stat-number">2550</div>
            <div className="stat-label">Total Revenue</div>
            <span className="icon is-large is-size-4">
              <i className="fa fa-user"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardCard;
