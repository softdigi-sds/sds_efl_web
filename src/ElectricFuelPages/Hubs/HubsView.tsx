import React from 'react';

interface City {
  value: number;
  label: string;
}

interface HubData {
  s_no: number;
  hub_id: string;
  office_city: string | City; 
  hub_location: string;
  sd_efl_office_id: string;
  state: string;
}

interface HubsViewProps {
  hubData: HubData;
}

const HubsView: React.FC<HubsViewProps> = ({ hubData }) => {
  return (
    <div className="container">
      <table className="table is-bordered is-fullwidth">
        <tbody>
        
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
          <tr>
            <th>Location</th>
            <td>{hubData.hub_location}</td>
          </tr>
          <tr>
            <th>Access Group</th>
            <td>{hubData.sd_efl_office_id}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{hubData.state}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HubsView;
