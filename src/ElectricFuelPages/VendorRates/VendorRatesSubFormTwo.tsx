import React from "react";

interface OfficeData {
  s_no: number;
  hub_id: string;
  vendor_company: string;
  pin_code: string;
  address_one: string;
  status: number;  cgst: number; 
  effective_date: number;
  gst_no: string;
  pan_no: string;
}

const VendorRatesSubFormTwo = ({ office }: { office: OfficeData }) => { 
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
            <th>Hub ID</th>
            <td>{office.hub_id}</td>
          </tr>
              <tr>
            <th>Company</th>
            <td>{office.vendor_company}</td>
          </tr>  <tr>
            <th>Effective Date</th>
            <td>{office.effective_date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VendorRatesSubFormTwo;
