import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Wind, Activity } from 'lucide-react';

const API_URL = "http://172.20.10.5:8000/api/data/"; // YOUR DJANGO IP HERE

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const sortedData = response.data.slice(0, 20).reverse(); // Show last 20 points, oldest first
      setData(sortedData);
      setLatestData(sortedData[sortedData.length - 1] || {});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000); // Fetch every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Smart Environment Monitor</h1>
        <p className="text-lg text-gray-600">Bakyt's IoT Project | Live Dashboard</p>
      </header>

      {/* Top Row: Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Temperature" value={`${latestData.temperature || 0} °C`} icon={<Thermometer className="text-red-500" />} bgColor="bg-red-50" />
        <StatCard title="Humidity" value={`${latestData.humidity || 0} %`} icon={<Droplets className="text-blue-500" />} bgColor="bg-blue-50" />
        <StatCard title="Smoke Level" value={latestData.smoke || 0} icon={<Wind className="text-yellow-600" />} bgColor="bg-yellow-50" />
        <StatCard title="PM2.5" value={latestData.pm25 || 0} icon={<Activity className="text-purple-600" />} bgColor="bg-purple-50" />
      </div>

      {/* Bottom Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-lg h-[400px]">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Temperature & Humidity Trends</h2>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="timestamp" tickFormatter={(str) => str.split('T')[1].substring(0, 5)} stroke="#888"/>
              <YAxis yAxisId="left" orientation="left" stroke="#ff4d4f" />
              <YAxis yAxisId="right" orientation="right" stroke="#1890ff" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ff4d4f" strokeWidth={3} name="Temp (°C)" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#1890ff" strokeWidth={3} name="Humidity (%)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg h-[400px]">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Air Quality (Smoke/PM2.5)</h2>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="timestamp" tickFormatter={(str) => str.split('T')[1].substring(0, 5)} stroke="#888"/>
              <YAxis stroke="#faad14" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="smoke" stroke="#faad14" strokeWidth={3} name="Smoke Level" dot={false} />
              <Line type="monotone" dataKey="pn25" stroke="#722ed1" strokeWidth={3} name="PM2.5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Reusable card component
const StatCard = ({ title, value, icon, bgColor }) => (
  <div className={`p-6 rounded-3xl shadow-lg flex items-center justify-between ${bgColor}`}>
    <div>
      <p className="text-sm font-semibold text-gray-600 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
    <div className="text-4xl p-3 bg-white rounded-full shadow-inner">{icon}</div>
  </div>
);

export default Dashboard;