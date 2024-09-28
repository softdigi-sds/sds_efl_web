import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const DashboardChart : React.FC = () => {
    
    ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'],
  datasets: [
    {
      data: [26, 32, 24, 9, 10],
      backgroundColor: [
        '#007bff', 
        '#28a745', 
        '#ffc107', 
        '#dc3545', 
        '#17a2b8' 
      ],
      hoverBackgroundColor: [
        '#0056b3',
        '#19692c', 
        '#d39e00', 
        '#bd2130',
        '#117a8b'  
      ]
    }
  ]
};
    return (
      <div>
        {/* <h3>Pie Chart</h3> */}
        <Pie data={data} />
      </div>
    );
  };

export default DashboardChart