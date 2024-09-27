import React from "react";

interface OfficeData {
  s_no: number;
  office_city: string;
  state: string;
  pin_code: string;
  address_one: string;
  status: string;
}

const OfficeTableView = ({ office }: { office: OfficeData }) => {
  return (
    <div className="container">
      <table className="table is-bordered is-fullwidth">
        <tbody>
          <tr>
            <th>S.NO</th>
            <td>{office.s_no}</td>
          </tr>
          <tr>
            <th>Office City</th>
            <td>{office.office_city}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{office.state}</td>
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
            <td>{office.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OfficeTableView;
