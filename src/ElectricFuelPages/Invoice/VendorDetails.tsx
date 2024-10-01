import React from 'react'
interface DataProps {
  data:any[]|any;
  }
const VendorDetails:React.FC<DataProps> = (data) => {
  return (
    <div className="container">
      <table className="table is-bordered is-fullwidth">
        <tbody>
          {/* <tr>
            <th>S.NO</th>
            <td>{hubData.s_no}</td>
          </tr> */}
          <tr>
            <th>Bill Start Date</th>
            <td></td>
          </tr>
          <tr>
            <th>Bill End Date</th>
            <td>{}</td>
          </tr>
          <tr>
            <th>Number Of Vehicles</th>
            <td>{}</td>
          </tr>
          <tr>
            <th>Parking Amount</th>
            <td>{}</td>
          </tr>
          <tr>
            <th>Vehicle Amount</th>
            <td></td>
          </tr>
          <tr>
            <th>Rent Amount</th>
            <td></td>
          </tr>
          <tr>
            <th>Other Amount</th>
            <td></td>
          </tr>
          <tr>
            <th>Taxable Amount</th>
            <td></td>
          </tr>
          <tr>
            <th>GST (%)</th>
            <td></td>
          </tr>
          <tr>
            <th>GST Amount</th>
            <td></td>
          </tr>
          <tr>
            <th>Total Bill Amount</th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default VendorDetails
