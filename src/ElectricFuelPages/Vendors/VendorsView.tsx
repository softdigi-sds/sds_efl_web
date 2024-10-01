import React from "react";

interface OfficeData {
  s_no: number;
  office_city: string;
  hub_id?: string;
  gst_no?: string;
  vendor_code?: string;
  vendor_company?: string;
  status: string;
}

const VendorsView = ({ office }: { office: OfficeData }) => {
  const nameFunction = (row: any) => {
    switch (row["status"]) {
      case "5":
        return <span className="has-text-link">Active</span>;

      case "0":
        return <span className="has-text-success">Inactive</span>;
    }
  };

  return (
    <div className="container">
      <table className="table is-bordered is-fullwidth">
        <tbody>
          <tr>
            <th>Hub ID</th>
            <td>{office.hub_id}</td>
          </tr>
          <tr>
            <th>GST No</th>
            <td>{office.gst_no}</td>
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
            <th>Status</th>
            <td>{nameFunction(office)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VendorsView;
