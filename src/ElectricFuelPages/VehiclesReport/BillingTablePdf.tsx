import React from "react";
import "./BillingTable.scss";

interface inputProps {
 data:any
  }
const BillingTablePdf: React.FC<inputProps> = ({data}) => {
  const data_old: any = {
    vendor_name: "SAPE",
    sub_data: [
      {
        date: "22-Aug-2024",
        count: 18,
        charge_month: 2200,
        charge_per_day: 22,
        total: 100,
      },
      {
        date: "23-Aug-2024",
        count: 18,
        charge_month: 2200,
        charge_per_day: 22,
        total: 100,
      },
    ],
    total_vehicles: 5456,
    avg_vehicles: 34,
    total_units: 44,
    min_units_vehicle: 34,
    units_allowed: 45,
    extra_units: 45,
  };

  return (
    <div className="billing-container">
      <table>
        <thead>
          <tr className="header-2">
            <th>BILLING FOR EV CHARGING</th>
            <th>{data?.vendor_name}</th>
            <th colSpan={3}>
              1) Parking Fee per vehicle: 2200/- &nbsp;&nbsp; | &nbsp;&nbsp; 2)
              Unit rate: 14/- &nbsp;&nbsp; | &nbsp;&nbsp; 3) Min Units billing:
              50 per vehicle
            </th>
          </tr>
          <tr>
            <td>Aug-24</td>
            <td>SAPE</td>
            <td rowSpan={2}>Charges Per Vehicle Per Month Rate</td>
            <td rowSpan={2}>Charges Per Vehicle Per Day</td>
            <td rowSpan={2}>Total Charges Per Day</td>
          </tr>{" "}
          <tr className="table-data">
            <td>Date</td>
            <td>Total Count</td>
          </tr>
        </thead>
        <tbody>
          {data.sub_data && data.sub_data.map((item: any, index: number) => (
            <tr className="table-data" key={index}>
              <td>{item.date}</td>
              <td>{item.count}</td>
              <td>{item.charge_month}</td>
              <td>{item.charge_per_day}</td>
              <td>{item.total}</td>
            </tr>
          ))}
          <tr className="table-data-bottom">
            <td>Total Vehicles</td>
            <td> {data.sub_data.reduce(
                (acc: number, curr: any) => acc + parseFloat(curr.count),
                0
              )}</td>
            <td></td>
            <td></td>
            <td>
              {data.sub_data.reduce(
                (acc: number, curr: any) => acc + curr.total,
                0
              )}
            </td>
          </tr>
          <tr className="table-data">
            <td>Max units allowed per Vehicle</td>
            <td>{data.min_units_vehicle}</td>
            <td></td>
            <td>Total units consumed</td>
            <td className="table-data-bottom">{data.total_units}</td>
          </tr>
          <tr className="table-data">
            <td>Avg. no. of vehicles</td>
            <td>{data.avg_vehicles}</td>
            <td>Total units allowed</td>
            <td></td>
            <td>{data.units_allowed}</td>
          </tr>
          <tr className="table-data">
            <td></td>
            <td></td>
            <td className="table-data-bottom">Extra Units consumed</td>
            <td className="table-data-bottom"></td>
            <td className="table-data-bottom">{data.extra_units}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BillingTablePdf ;
