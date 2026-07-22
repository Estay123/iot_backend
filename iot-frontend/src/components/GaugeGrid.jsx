import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Zap } from 'lucide-react';

const GaugeSquareCard = ({ value, label, unit, max = 100, color = "#3b82f6" }) => {
  const chartData = [{ value: value || 0, fill: color }];
  
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden h-full group">
      {/* 顶部标签 */}
      <div className="flex justify-between items-start z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        <Zap size={14} className="text-slate-200" />
      </div>
      
      {/* 核心：半圆轨道背景 + 适中的数字 */}
      <div className="absolute inset-0 flex items-center justify-center top-6">
        <div className="w-full h-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              cx="50%" cy="80%" 
              innerRadius="80%" outerRadius="120%" 
              barSize={12} 
              data={chartData} 
              startAngle={180} endAngle={0}
            >
              {/* 浅灰色半圆轨道背景 */}
              <PolarAngleAxis 
                type="number" domain={[0, max]} angleAxisId={0} tick={false} 
                axisLine={{ stroke: '#f1f5f9', strokeWidth: 12 }} 
              />
              <RadialBar background clockWise dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
          
          {/* 数字比例维持在 5xl，保持精致感 */}
          <div className="absolute top-[45%] flex flex-col items-center">
            <span className="text-5xl font-black text-slate-900 tabular-nums tracking-tighter">
              {value ?? '--'}
            </span>
            <span className="text-[10px] font-bold text-slate-300 uppercase">{unit}</span>
          </div>
        </div>
      </div>

      {/* ✅ 底部颜色框已移除，保持纯净 */}
    </div>
  );
};

export default function GaugeGrid({ latest }) {
  const l = latest || {};
  return (
    <div className="col-span-8 grid grid-cols-3 grid-rows-2 gap-6 h-full min-h-0">
      <GaugeSquareCard label="Temperature" value={l.temperature} unit="℃" max={50} color="#ef4444" />
      <GaugeSquareCard label="Humidity" value={l.humidity} unit="%" max={100} color="#3b82f6" />
      <GaugeSquareCard label="Smoke" value={l.smoke} unit="idx" max={1000} color="#f59e0b" />
      <GaugeSquareCard label="PM2.5" value={l.pm25} unit="μg/m³" max={500} color="#a855f7" />
      <GaugeSquareCard label="System" value={18} unit="%" max={100} color="#10b981" />
    </div>
  );
}