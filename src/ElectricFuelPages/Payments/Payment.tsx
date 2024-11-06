import React from "react";
import PaymentsCount from "./PaymentsCount";
import PaymentInvoice from "./PaymentInvoice";
import RecentPayment from "./RecentPayment";

const Payment = () => {
  return (
    <>
      <div className="has-text-white">
        <div className="">
       
          <PaymentsCount />
        </div>
        <div className="m-4 mt-6">
          <PaymentInvoice />
        </div>
        <div className="m-4 mt-6">
          <RecentPayment />
        </div>
      </div>
    </>
  );
};

export default Payment;
