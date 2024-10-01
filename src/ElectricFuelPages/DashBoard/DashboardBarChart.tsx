import React, { useEffect, useState } from 'react';
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
import { SmartSoftSelect } from 'soft_digi';
import { hubs_get_all_select } from '../../services/site/SelectBoxServices';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardBarChart: React.FC = () => {
  const [hubs, setHubs] = useState<any>();
  const [hub, setHub] = useState<any>();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Generate an array of years (e.g., last 10 years + current year)
  const years = Array.from(new Array(10), (_, index) => ({
    label: `${currentYear - index}`, // Displayed text in the dropdown
    value: currentYear - index, // Value for each option
  }));

  // Handle the change when a user selects a year
  const handleYearChange = (selectedValue: number | null) => {
    setSelectedYear(selectedValue || currentYear); // Fallback to current year if null
  };
  useEffect(() => {
    hubs_get_all_select(setHubs);
  }, []);

  useEffect(() => {
    // update the first when the ubs are loaded
    if (hubs && hubs.length > 0) {
      setHub(hubs[0]);
    }
 

  }, [hubs]);
  const data = {
    
    labels :['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    datasets: [
      {
        label: 'Vehicle Report',
        data: [800, 400, 600, 300, 900, 200, 100],
        backgroundColor: '#2575fc',
      },
      {
        label: 'Consumption Report',
        data: [200, 700, 500, 600, 300, 500, 400,600],
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
      // title: {
      //   display: true,
      //   text: 'Bar Chart',
      // },
    },
  };

  return (
    <>
    <div className='columns'>
      <div className='column is-8'>
        <p className='is-size-4 has-text-weight-bold '>Performance Details</p>
      </div>
      <div className='column  is-4' >
        <div className='is-flex is-right sd-efl-input'>
        <SmartSoftSelect
            options={hubs}
            placeHolder="Select hub"
            value={hub}
            onChange={(value) => setHub(value)}
          />
          <div className='ml-2'>
          <SmartSoftSelect
            options={years}
            placeHolder="Select Year"
            value={selectedYear}
            onChange={handleYearChange}
          />
          </div>
       
        </div>
     
      </div>
    </div>
      <div className="">
        <Bar data={data} options={options} height={100}/>
      </div>
    </>
  );
};

export default DashboardBarChart;
