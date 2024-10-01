import React from 'react'
interface DataProps {
  data:any[]|any;
  }
const VendorDetails:React.FC<DataProps> =(props) => {
 const{data} = props
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
            <td>{data?.total_vehicles            }</td>
          </tr>
          <tr>
            <th>Parking Amount</th>
            <td>{data?.total_units}</td>
          </tr>
          <tr>
            <th>Vehicle Amount</th>
            <td>{data?.vehicle_amount}</td>
          </tr>
          <tr>
            <th>Rent Amount</th>
            <td>{data?.rent_amount}</td>
          </tr>
          <tr>
            <th>Other Amount</th>
            <td>{data?.other_one_amount}</td>
          </tr>
          <tr>
            <th>Taxable Amount</th>
            <td>{data?.total_taxable            }</td>
          </tr>
          <tr>
            <th>GST (%)</th>
            <td>{data?.gst_percentage}</td>
          </tr>
          <tr>
            <th>GST Amount</th>
            <td>{data?.gst_amount   }</td>
          </tr>
          <tr>
            <th>Total Bill Amount</th>
            <td>{data?.total_amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default VendorDetails
