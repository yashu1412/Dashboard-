import React, { useRef, Suspense } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Lazy load Profile and ProfilePreview components
// const Profile = React.lazy(() => import('./Profile'));
const ProfilePreview = React.lazy(() => import('./ProfileReview'));

function Dashboard() {
  const revenueChartRef = useRef(null);
  const leadChartRef = useRef(null);

  const revenueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: 'Revenue',
        data: [100, 200, 150, 300, 250, 400],
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(75,192,192,0.5)',
        fill: true,
      },
    ],
  };

  const leadChartData = {
    labels: ['John Doe', 'Jane Smith', 'Sam Johnson'],
    datasets: [
      {
        label: 'Lead Value ($)',
        data: [300, 500, 100],
        backgroundColor: [
          'rgba(255,99,132,0.8)',
          'rgba(54,162,235,0.8)',
          'rgba(75,192,192,0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue Widget */}
        <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out text-white border-2 border-gray-500">
          <h3 className="text-lg font-bold mb-4">Revenue</h3>
          <Line ref={revenueChartRef} data={revenueData} options={chartOptions} />
        </div>

        {/* Lead Status Widget */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out text-white border-2 border-gray-500">
          <h3 className="text-lg font-bold mb-4">Lead Value</h3>
          <Bar ref={leadChartRef} data={leadChartData} options={chartOptions} />
        </div>

        {/* Tasks Widget */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out text-white border-2 border-gray-500">
          <h3 className="text-lg font-bold mb-4">Tasks</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Task 1</span>
              <span className="text-gray-200">Completed</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Task 2</span>
              <span className="text-gray-200">In Progress</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Task 3</span>
              <span className="text-gray-200">Pending</span>
            </li>
          </ul>
        </div>

        {/* Recent Activity Widget */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out text-white border-2 border-gray-500">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-2">
            <li className="text-gray-200">You completed Task 1</li>
            <li className="text-gray-200">You added a new lead</li>
            <li className="text-gray-200">You updated your profile</li>
          </ul>
        </div>

        {/* Notifications Widget */}
        <div className="bg-gradient-to-r from-red-400 to-red-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out text-white border-2 border-gray-500">
          <h3 className="text-lg font-bold mb-4">Notifications</h3>
          <ul className="space-y-2">
            <li className="text-gray-200">New message from Jane Smith</li>
            <li className="text-gray-200">Your profile was updated successfully</li>
            <li className="text-gray-200">New lead added</li>
          </ul>
        </div>

        {/* Profile Preview Widget */}
        <Suspense fallback={<div>Loading Profile Preview...</div>}>
          <ProfilePreview />
        </Suspense>
      </div>

    </div>
  );
}

export default Dashboard;
