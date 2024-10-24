import React from 'react';

interface ViewDetailsProps {
  customerData: any; 
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ customerData }) => {
  return (
    <div className="table-container has-text-centered">
      <table className="table is-bordered is-fullwidth">
       
        <tbody>
          <tr>
            <td><strong>Company</strong></td>
            <td>{customerData.vendor_company}</td>
          </tr>
          <tr>
            <td><strong>Name</strong></td>
            <td>{customerData.vendor_name}</td>
          </tr>
          <tr>
            <td><strong>PAN No.</strong></td>
            <td>{customerData.pan_no}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewDetails;
