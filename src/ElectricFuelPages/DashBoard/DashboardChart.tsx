import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const DashboardChart: React.FC = () => {

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ['Parking', 'Consumption', 'Others'],  
    datasets: [
      {
        data: [30, 50, 20], 
        backgroundColor: ['#007bff', '#28a745', '#ffc107'],  
        hoverBackgroundColor: ['#0056b3', '#19692c', '#d39e00']  
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
  };

  return (
    <div className='canvas'>
      <div className='is-size-4 has-text-weight-bold'>Revenue Overview</div>  
      <div className="m-3" style={{ height: '450px' }}> 
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardChart;
