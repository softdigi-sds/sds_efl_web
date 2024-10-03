import React from 'react'
const VendorRatesView = ({ userData }: { userData: any }) => {
    const nameFunction = (row: any) => {
        switch (row.active_status) {
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
              <tr>
                <th>Hub ID</th>
                <td>{userData?.hub_id}</td>
              </tr>
              <tr>
                <th>Vendor Company</th>
                <td>{userData?.vendor_company}</td>
              </tr>
              <tr>
                <th>Effective Date</th>
                <td>{userData?.effective_date}</td>
              </tr>
              {/* <tr>
                <th>Last Modified By</th>
                <td>{userData?.last_modified_by}</td>
              </tr>
              <tr>
                <th>Last Modified Time</th>
                <td>{userData?.last_modified_time}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{nameFunction(userData)}</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      );
      
}

export default VendorRatesView