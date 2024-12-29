import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import ASidebar from './Shared/Asidebar';
import Navbar from '../Pages/Shared/Navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Apage = () => {
 
  // Data and options for the Bar Chart (e.g., Monthly Deliveries)
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Deliveries',
        data: [30, 45, 60, 40, 80, 70, 90, 100, 85, 60, 40, 55],
        backgroundColor: '#4CAF50'
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Deliveries' }
    }
  };

  // Data and options for the Pie Chart (e.g., Delivery Types)
const pieData = {
  labels: ['Home Delivery', 'Pickup Points', 'Outside Dhaka Delivery', 'Declined Delivery'],
  datasets: [
    {
      data: [30, 35, 25, 10], // Adjusted to include Outside Dhaka Delivery
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'red'], // Added color for the new segment
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: true, text: 'Delivery Type Distribution' }
  }
};

  // Data and options for the Line Chart (e.g., Average Delivery Time)
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Average Delivery Time (hrs)',
        data: [2.5, 3.0, 2.8, 3.2],
        borderColor: '#FFBB33',
        backgroundColor: 'rgba(255, 187, 51, 0.2)',
        fill: true
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Weekly Average Delivery Time' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="lg:flex">
        <ASidebar/>
        <div className="p-6 flex flex-col gap-8 w-full">
          <div className="text-2xl font-bold mb-4">Courier Dashboard</div>

          {/* Top Row: Bar and Pie Charts */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <Bar data={barData} options={barOptions} />
            </div>

            {/* Smaller Pie Chart */}
            <div className="flex justify-center items-center bg-white p-4 shadow-lg rounded-lg">
              <div className="w-2/3"> {/* Adjust width to make pie chart smaller */}
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>
          </div>

          {/* Bottom Row: Line Chart */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apage;
