import React from 'react';
import './BillingTable.scss';

const BillingTablePdf: React.FC = () => {
  return (
    <div className="billing-container">
      <table>
        <thead>
          <tr className="header-2">
            <th>BILLING FOR EV CHARGING</th>
            <th>AMPLUS-3W</th>
            <th colSpan={3}>
              1) Parking Fee per vehicle: 2200/- &nbsp;&nbsp; | &nbsp;&nbsp; 2) Unit rate: 14/- &nbsp;&nbsp; | &nbsp;&nbsp; 3) Min Units billing: 50 per vehicle
            </th>
          </tr>
          <tr>
            <td>Aug-24</td>
            <td>SAPE</td>
            <td rowSpan={2}>Charges Per Vehicle Per Month Rate</td>
            <td rowSpan={2}>Charges Per Vehicle Per Day</td>
            <td rowSpan={2}>Total Charges Per Day</td>
          </tr>
          <tr className="table-data">
            <td>Date</td>
            <td>Total Count</td>
          </tr>
        </thead>
        <tbody>
          <tr className="table-data">
            <td>22-Aug-2024</td>
            <td>12</td>
            <td>2200</td>
            <td>70.97</td>
            <td>851.61</td>
          </tr>
          <tr className="table-data">
            <td>23-Aug-2024</td>
            <td>12</td>
            <td>2200</td>
            <td>70.97</td>
            <td>851.61</td>
          </tr>
          {/* Repeat for other rows */}
          <tr className="table-data-bottom">
            <td>Total</td>
            <td>5362</td>
            <td></td>
            <td></td>
            <td>26,851.61</td>
          </tr>
          <tr className="table-data">
            <td>Max units allowed per Vehicle</td>
            <td>0</td>
            <td></td>
            <td>Total units consumed</td>
            <td className="table-data-bottom"></td>
          </tr>
          <tr className="table-data">
            <td>Avg. no. of vehicles</td>
            <td>12.03</td>
            <td>Total units allowed</td>
            <td></td>
            <td>26</td>
          </tr>
          <tr className="table-data">
            <td></td>
            <td></td>
            <td className="table-data-bottom">Extra Units consumed</td>
            <td className="table-data-bottom"></td>
            <td className="table-data-bottom"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BillingTablePdf;
