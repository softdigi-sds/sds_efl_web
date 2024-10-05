import React from "react";

interface OfficeData {
  s_no: number;
  office_city: string;
  hub_name?: string;
  gst_no?: string;
  vendor_code?: string;
  vendor_company?: string;
  status: number;
  vendor_name?: string;
  address_one?: string;
  address_two?: string;
  pan_no?: string;
  state_name?: string; 
}

const VendorsView = ({ office }: { office: OfficeData }) => {
  const nameFunction = (row: OfficeData) => {
    switch (row.status) {
      case 5:
        return <span className="has-text-success">Active</span>;
      case 0:
        return <span className="has-text-danger">Inactive</span>;
  
    }
  };

  return (
    <div className="container">
      <table className="table is-bordered is-fullwidth">
        <tbody>
          {/* <tr>
            <th>Hub ID</th>
            <td>{office.hub_name}</td>
          </tr> */}
          <tr>
            <th>Name</th>
            <td>{office.vendor_name}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
              {office.address_one}, {office.address_two}
            </td>
          </tr>
          <tr>
            <th>GST No</th>
            <td>{office.gst_no}</td>
          </tr>
          <tr>
            <th>Pan No</th>
            <td>{office.pan_no}</td>
          </tr>
          <tr>
            <th>Code</th>
            <td>{office.vendor_code}</td>
          </tr>
          <tr>
            <th>Company</th>
            <td>{office.vendor_company}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{office.state_name}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{nameFunction(office)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VendorsView;
