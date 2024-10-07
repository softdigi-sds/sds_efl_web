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
  const [category, setCategory] = useState("2");
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const years = Array.from(new Array(10), (_, index) => ({
    label: `${currentYear - index}`,
    value: currentYear - index,
  }));

  const handleYearChange = (selectedValue: number | null) => {
    setSelectedYear(selectedValue || currentYear);
  };

  useEffect(() => {
    hubs_get_all_select(setHubs);
  }, []);

  useEffect(() => {
    if (hubs && hubs.length > 0) {
      setHub(hubs[0]);
    }
  }, [hubs]);

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Vehicle Report',
        data: [800, 400, 600, 300, 900, 200, 100],
        backgroundColor: '#2575fc',
      },
      {
        label: 'Consumption Report',
        data: [200, 700, 500, 600, 300, 500, 400, 600],
        backgroundColor: '#ff7eb3',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const categoryOptions = [
    { value: "1", label: "Month" },
    { value: "2", label: "Year" }
  ];

  return (
    <>
      <div className="columns is-multiline is-vcentered">
        <div className="column is-12-tablet is-8-desktop">
          <p className="is-size-4 has-text-weight-bold">Performance Details</p>
        </div>
        <div className="column is-12-tablet is-4-desktop">
          <div className="is-flex is-justify-content-flex-end">
            <SmartSoftSelect
              options={hubs}
              placeHolder="Select hub"
              value={hub}
              onChange={(value) => setHub(value)}
            />
            <div className="ml-2">
              <SmartSoftSelect
                options={categoryOptions}
                placeHolder="Select"
                value={category}
                onChange={(value) => setCategory(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <Bar data={data} options={options} height={400} />
      </div>
    </>
  );
};

export default DashboardBarChart;
