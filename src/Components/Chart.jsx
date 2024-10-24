import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  ArcElement 
} from 'chart.js';

// Register necessary components from Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  ArcElement
);

const ChartComponent = ({ type, data, options, className }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const renderChart = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy existing chart instance
      }

      // Create new chart instance
      chartInstanceRef.current = new ChartJS(chartRef.current, {
        type: type, // Dynamic chart type: 'line', 'bar', 'pie', etc.
        data: data,
        options: options,
      });
    };

    // Render the chart
    renderChart();

    // Cleanup function to destroy the chart instance on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Cleanup on unmount
      }
    };
  }, [type, data, options]); // Re-render when props change

  return (
    <div className={`chart-container ${className}`}>
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default ChartComponent;
