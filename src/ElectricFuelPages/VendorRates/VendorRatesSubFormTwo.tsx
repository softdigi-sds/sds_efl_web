import React from "react";

const VendorRatesSubFormTwo = ({ office }: { office: any }) => { 
  const nameFunction = (row: any) => {
    switch (row.status) {
      case 5:
        return <span className="has-text-success">Active</span>;
      case 0:
        return <span className="has-text-danger">Inactive</span>;
      default:
        return <span>Status Unknown</span>;
    }
  };

  const RatesDisplay = ({ rate_data }: { rate_data: any }) => {
    return (
      <>
        {rate_data?.map((item: any, index: any) => (
          <tr key={index}>
            <td>{item?.sd_hsn_id?.label || "N/A"}</td>
            <td>{item?.rate_type?.label || "N/A"}</td>
            <td>{item?.min_start || "N/A"}</td>
            <td>{item?.min_end || "N/A"}</td>
            <td>{item?.price || "N/A"}</td>
            <td>{item?.extra_price || "N/A"}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="container">
      {/* Office Details Table */}
      <table className="table is-bordered is-fullwidth">
        <tbody>
          <tr>
            <th>Hub ID</th>
            <td>{office?.hub_id || "N/A"}</td>
          </tr>
          <tr>
            <th>Company</th>
            <td>{office?.vendor_company || "N/A"}</td>
          </tr>
          <tr>
            <th>Effective Date</th>
            <td>{office?.effective_date || "N/A"}</td>
          </tr>
        </tbody>
      </table>

      {/* Rates Table */}
      <table className="table is-striped is-bordered is-fullwidth">
        <thead>
          <tr>
            <th>Type</th>
            <th>Rate Type</th>
            <th>Range Start</th>
            <th>Range End</th>
            <th>Price (Rs)</th>
            <th>Extra Price (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {office?.rate_data ? (
            <RatesDisplay rate_data={office.rate_data} />
          ) : (
            <tr>
              <td colSpan={6}>No rate data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorRatesSubFormTwo;
