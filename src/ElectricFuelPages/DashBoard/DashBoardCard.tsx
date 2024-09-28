import React from "react";

const DashBoardCard = () => {


  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <div className="stat-card gradient-blue box">
            <div className="stat-number">2050</div>
            <div className="stat-label">Total Orders</div>
            <span className="icon is-large">
              <i className="fa fa-shopping-cart"></i>
            </span>
          </div>
        </div>

        <div className="column is-one-quarter">
          <div className="stat-card gradient-pink box">
            <div className="stat-number">3250</div>
            <div className="stat-label">Total Expenses</div>
            <span className="icon is-large">
              <i className="fa fa-wallet"></i>
            </span>
          </div>
        </div>

        <div className="column is-one-quarter">
          <div className="stat-card gradient-green box">
            <div className="stat-number">87.5%</div>
            <div className="stat-label">Total Revenue</div>
            <span className="icon is-large">
              <i className="fa fa-pie-chart"></i>
            </span>
          </div>
        </div>

        <div className="column is-one-quarter">
          <div className="stat-card gradient-orange box">
            <div className="stat-number">2550</div>
            <div className="stat-label">New Users</div>
            <span className="icon is-large">
              <i className="fa fa-user"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardCard;
