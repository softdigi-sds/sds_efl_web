import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardBarChart: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [800, 400, 600, 300, 900, 200, 100],
        backgroundColor: '#2575fc',
      },
      {
        label: 'Dataset 2',
        data: [200, 700, 500, 600, 300, 500, 400],
        backgroundColor: '#ff7eb3',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  };

  return (
    <>
      <div className="">
        <Bar data={data} options={options} height={100}/>
      </div>
    </>
  );
};

export default DashboardBarChart;
