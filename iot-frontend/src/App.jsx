import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import MetricCard from './components/MetricCard.jsx';
import GaugeGrid from './components/GaugeGrid.jsx';
import ChartSection from './components/ChartSection.jsx';

// 🎯 本地同台电脑开发，127.0.0.1 是最稳妥的
const API_URL = "http://127.0.0.1:8000/api/data/";
const WS_URL = "ws://127.0.0.1:8001/ws/data/";

export default function App() {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState({});
  const [predictionData, setPredictionData] = useState([]);

  // 1. 初始化拉取最近的 20 条历史数据
  const fetchInitialData = async () => {
    try {
      const res = await axios.get(API_URL);
      const rawData = Array.isArray(res.data) ? res.data : (res.data.realtime || []);
      const sorted = rawData.slice(0, 20).reverse();
      setData(sorted);
      setLatest(sorted[sorted.length - 1] || {});
    } catch (err) { 
      console.error("初始数据获取失败:", err); 
    }
  };

  useEffect(() => {
    fetchInitialData();

    // 生成静态的 Mock 预测数据
    const mockPred = Array.from({ length: 24 }, (_, i) => ({
      time: `${i + 1}h`,
      iaq: Math.round(45 + 12 * Math.sin(i / 4) + Math.random() * 5)
    }));
    setPredictionData(mockPred);

    // 2. ⚡ 建立 WebSocket 连接
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => console.log("✅ WebSocket 连接成功！");
    
    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      console.log("实时收到后端推送:", payload);
      
      // 兼容处理：防范后端将真实数据包在了 payload.data 里面
      const newPayload = payload.data ? payload.data : payload;
      
      setLatest(newPayload);
      
      setData((prevData) => {
        const updated = [...prevData, newPayload];
        if (updated.length > 30) {
          return updated.slice(1);
        }
        return updated;
      });
    };

    socket.onclose = () => console.log("❌ WebSocket 连接已断开。");
    socket.onerror = (err) => console.error("WebSocket 错误:", err);
    return () => {
      socket.close();
    };
  }, []);

  // 计算当前的 IAQ
  const iaq = useMemo(() => {
    const t = latest.temperature || 0;
    const p = latest.pm25 || 0;
    const s = latest.smoke || 0;
    return Math.round(t * 0.4 + p * 0.3 + s * 0.1);
  }, [latest]);

  // 给图表准备的数据流
  const historyChartData = data.map(d => ({
    time: d.timestamp?.split('T')[1]?.substring(0, 5) || '--',
    iaq: Math.round((d.temperature||0)*0.4 + (d.pm25||0)*0.3 + (d.smoke||0)*0.1)
  }));
  
  return (
    <div className="h-screen w-screen bg-[#f8fafc] font-sans text-slate-900 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col p-10 px-20 gap-10">
        
        <Header />
        
        <section className="grid grid-cols-12 gap-8">
          <MetricCard iaq={iaq} predIaq={predictionData[0]?.iaq} />
          <GaugeGrid latest={latest} />
        </section>

        <section className="h-[450px] w-full pb-10">
          <ChartSection historyData={historyChartData} predictionData={predictionData} />
        </section>

      </div>
    </div>
  );
}