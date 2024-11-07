import React from 'react';


interface HubsViewProps {
  hubData: any;
}

const HubsView: React.FC<HubsViewProps> = ({ hubData }) => {

  console.log("hub data",hubData)

  const nameFunction = (row: any) => {
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
        <tr>
            <th>Hub Name</th>
            <td>{hubData.hub_name}</td>
          </tr>
          <tr>
            <th>Hub Id</th>
            <td>{hubData.hub_id}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>
              {typeof hubData.office_city === 'object' ? hubData.office_city.label : hubData.office_city}
            </td>
          </tr>
          {/* <tr>
            <th>Office City</th>
            <td>{hubData.office_city}</td>
          </tr> */}
          <tr>
            <th>Access Group</th>
            <td>{hubData?.role && hubData.role.map((item:any)=>(
              <>
              {item.label}
              </>
            ))}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{nameFunction(hubData)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HubsView;
