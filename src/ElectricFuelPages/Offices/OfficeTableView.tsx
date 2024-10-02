import React from "react";

interface OfficeData {
  s_no: number;
  office_city: string;
  state_name: string;
  pin_code: string;
  address_one: string;
  status: number;  cgst: number; 
  sgst: number;
  gst_no: string;
  pan_no: string;
}

const OfficeTableView = ({ office }: { office: OfficeData }) => { 
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
            <th>S.NO</th>
            <td>{office.s_no}</td>
          </tr> */}
      <tr>
            <th>Office City</th>
            <td>{office.office_city}</td>
          </tr>
              <tr>
            <th>CGST(%)</th>
            <td>{office.cgst}</td>
          </tr>  <tr>
            <th>SGST(%)</th>
            <td>{office.sgst}</td>
          </tr>  <tr>
            <th>GST No.</th>
            <td>{office.gst_no}</td>
          </tr>  
            <th>PAN No.</th>
            <td>{office.pan_no}</td>
            <tr>
            <th>State</th>
            <td>{office.state_name}</td>
          </tr>
          <tr>
            <th>Pin Code</th>
            <td>{office.pin_code}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{office.address_one}</td>
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

export default OfficeTableView;
