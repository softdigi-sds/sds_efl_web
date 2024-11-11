import React from "react";
interface props {
  data: any
}
const PaymentsCount:React.FC<props>  = ({data}) => {
  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-12-mobile is-6-tablet is-one-quarter-desktop">
          <div className="box has-text-centered smart-payment-card-one">
            <span className="icon is-large is-size-3 ">
              <i className="fas fa-inr"></i>
            </span>
            <p className="title is-4 ">{data?.invoice_count}</p>
            <p className="subtitle is-6">Invoices</p>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-one-quarter-desktop">
          <div className="box has-text-centered smart-payment-card-tow">
            <span className="icon is-large is-size-3 ">
              <i className="fas fa-file-invoice"></i>
            </span>
            <p className="title is-4">{data?.invoice_amount}</p>
            <p className="subtitle is-6">Invoiced Amount</p>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-one-quarter-desktop">
          <div className="box has-text-centered smart-payment-card-three">
            <span className="icon is-large is-size-3">
              <i className="fas fa-eye"></i>
            </span>
            <p className="title is-4 ">{data?.paid_amount}</p>
            <p className="subtitle is-6">Received Payment</p>
          </div>
        </div>

        <div className="column is-12-mobile is-6-tablet is-one-quarter-desktop">
          <div className="box has-text-centered smart-payment-card-four">
            <span className="icon is-large is-size-3 ">
              <i className="fas fa-share-alt"></i>
            </span>
            <p className="title is-4 ">{data?.rem_amount}</p>
            <p className="subtitle is-6">Pending Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsCount;
